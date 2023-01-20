$(document).ready(function () {
    const form = $("#calculatorForm");
    const formOptions = $("#formItems");

    const item = $("#item");
    const itemCount = $("#itemcount");
    const items = $("#items");

    const output = $("#content");

    const copyButton = $("#copyButton");
    const downloadButton = $("#downloadButton");

    const minus = $("#minus");
    const plus = $("#plus");
    const input = $("input[name='quant']");

    minus.click(function (e) {
        const currentVal = parseInt(input.attr('value'));

        if (!isNaN(currentVal)) {
            if (currentVal > input.attr('min')) {
                input.attr('value', (currentVal - 1).toString());
            }

            if (currentVal - 1 == input.attr('min')) {
                $(this).attr('disabled', true);
            }

            $("#iteminput" + currentVal).remove();
        } else {
            input.attr('value', '0');
        }
    });

    plus.click(function (e) {
        const currentVal = parseInt(input.attr('value'));

        if (!isNaN(currentVal)) {
            if (currentVal < input.attr('max')) {
                input.attr('value', (currentVal + 1).toString());
            }

            if (currentVal == input.attr('max')) {
                $(this).attr('disabled', true);
                return;
            }

            if (parseInt(input.attr('value')) > 1) {
                minus.prop('disabled', false);
            } else {
                minus.prop('disabled', true);
            }

            items.append("<div id=\"iteminput" + (currentVal + 1) + "\" class=\"mb-3 w-50\"><label for=\"item" + (currentVal + 1) + "\">Model for damage " + (currentVal + 1) + ":</label><input type=\"text\" class=\"form-control\" id=\"item" + (currentVal + 1) + "\" name=\"item" + (currentVal + 1) + "\" placeholder=\"cars/" + randomModel() + "\" required></div>");
        } else {
            input.attr('value', '0');
        }
    });

    item.change(function () {
        //If value is not empty, show other options ...
        if (this.value !== "") {
            formOptions.show();

            //... and set max value of item count.
            const max = itemDamages[this.value];
            itemCount.prop('max', max);
            plus.prop('disabled', false);
        } else { //Or if empty, hide other options.
            formOptions.hide();
        }
    });

    form.on("submit", function (e) {
        e.preventDefault();

        //Get selected item and amount of models
        const selectedItem = item.val();
        const currentVal = parseInt(input.attr('value'));

        //Build models array
        const models = [];
        for (let i = 0; i < currentVal; i++) {
            models[i] = $("#item" + (i + 1)).val();
        }

        //Convert to JSON, and set in content field (with syntax highlighting)
        const json = buildJSON(selectedItem, models);
        output.html(syntaxHighlight(json));

        //And fix the Download knop
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
        downloadButton.attr("href", dataStr);
        downloadButton.attr("download", selectedItem + ".json");

        //Return false to not reload the page
        return false;
    });

    copyButton.click(function (e) {
        e.preventDefault();
        navigator.clipboard.writeText(output.text());
    });

    /**
     * Get a random model.
     *
     * @return {string} The random model.
     */
    function randomModel() {
        const months = ["red_car", "blue_car", "green_car", "orange_car", "blue_bicycle", "red_bicycle", "green_bicycle", "orange_bicycle"];
        return months[Math.floor(Math.random() * months.length)];
    }
});