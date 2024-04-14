// Damage values for items
// Can be found at: https://minecraft.fandom.com/wiki/
const itemDamages = {
    'leather_helmet': 55, // Called a cap for new versions of the game
    'leather_chestplate': 80,
    'leather_leggings': 75,
    'leather_boots': 65,
    'netherite_hoe': 2031
};

/**
 * Generate the JSON file.
 *
 * @param item The item to generate it for.
 * @param namespace The namespace to use.
 * @param models An array of models to insert.
 * @returns {String} The JSON for the texturepack.
 */
function buildJSON(item, namespace, models) {
    if (namespace == "minecraft") {
        namespace = "";
    } else {
        namespace += ":";
    }

    const json = {};

    //Default values
    json['parent'] = 'item/handheld';
    json['textures'] = {
        'layer0': 'item/' + item,
        'layer1': 'item/' + item + '_overlay'
    };

    //Insert models
    json['overrides'] = [];

    //Insert default model
    json['overrides'][0] = {
        'predicate': {
            'damaged': 0,
            'damage': 0
        },
        'model': namespace + 'item/' + item
    };

    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        const damage = (i + 1) / (itemDamages[item] - 1);

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
