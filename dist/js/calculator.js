//TODO Support more items
const itemDamages = {
    'leather_boots': 64,
    'netherite_hoe': 2030
};

/**
 * Map an in-game Damage to an texturepack Damage.
 *
 * @param value The input value.
 * @param oldMax The old max value, from the itemDamages array.
 */
function getMappedDamage(value, oldMax) {
    return value / oldMax;
}

/**
 * Generate the JSON file.
 *
 * @param item The item to generate it for.
 * @param models An array of models to insert.
 * @returns {String} The JSON for the texturepack.
 */
function toJSON(item, models) {
    const json = {};

    //Default values
    json['parent'] = 'item/handheld';
    json['textures'] = {
        'layer0': 'item/' + item
    };

    //Insert models
    json['overrides'] = [];

    //Insert default model
    json['overrides'][0] = {
        'predicate': {
            'damaged': 0,
            'damage': 0
        },
        'model': 'item/' + item
    };

    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        const damage = getMappedDamage(i + 1, itemDamages[item]);

        json['overrides'][i + 1] = {
            'predicate': {
                'damaged': 0,
                'damage': damage
            },
            'model': model
        };
    }

    //Insert damaged model
    json['overrides'][models.length + 1] = {
        'predicate': {
            'damaged': 1,
            'damage': 0
        },
        'model': 'item/' + item
    };

    return JSON.stringify(json, null, 2);
}
