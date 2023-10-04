const _ = require('lodash');

class HierarchyBuilder {
    constructor() { }

    buildHierarchy(list, levels, relation, levelNo = 0, index = 0, resultSet = []) {

        if (levelNo == levels.length) return resultSet;

        let table = {}; let conditionalMap = {}

        let level = levels[levelNo];

        let { groupByKeys, differentiator, children = [], entities, parent, conditionalProperties = [] } = level;

        let { properties } = entities[index];

        let groupedMap = _.groupBy(list, (g) => {
            let newKey = groupByKeys.map(i => `${g[i]}`).join('©®');

            for (let cp of conditionalProperties) {
                let matched = []; let { column, name } = cp;
                for (let condition of cp.condition) {
                    if (g[condition.key] == condition.value) matched.push(1);
                    else matched.push(0);
                }
                if (matched.indexOf(0) == -1) {
                    if (newKey in conditionalMap) conditionalMap[newKey][name] = g[column];
                    else {
                        conditionalMap[newKey] = {};
                        conditionalMap[newKey][name] = g[column];
                    };
                }
            }

            table[newKey] = g;
            return newKey;
        });

        ++levelNo;

        for (let key in groupedMap) {
            let obj = {};
            for (let r in properties) {
                obj[properties[r]] = table[key][r];
            }

            if (key in conditionalMap) {
                let conditionalProperties = conditionalMap[key];
                obj = { ...obj, ...conditionalProperties };
            }

            if (!differentiator) {
                let g = table[key];
                if (parent) {
                    let key = `${g['T0796_Level1_ID']}©®${g['T0800_Opt_Level1_ID']}`;
                    obj.children = relation[key];
                } else {
                    obj.children = this.buildHierarchy(groupedMap[key], levels, relation, levelNo);
                }
            } else {
                obj.children = [];
                children.forEach((child, index) => {
                    obj.children.push(this.buildHierarchy(groupedMap[key].filter(i => i[differentiator] == child.id), levels, relation, levelNo, index))
                });

            }
            resultSet.push(obj);
        }

        return resultSet;
    }

}

module.exports = HierarchyBuilder;