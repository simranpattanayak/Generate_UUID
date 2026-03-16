sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
], function (Controller, MessageToast, Spreadsheet, exportLibrary) {
    "use strict";

    return Controller.extend("uuidgenerator.controller.Main", {
        onGenerate: function () {
            var oModel = this.getOwnerComponent().getModel();
            var iNum = parseInt(this.byId("numInput").getValue());

            if (!iNum || iNum < 1) {
                return MessageToast.show("Please enter a valid number");
            }
            var oAction = oModel.bindContext("/generateUUIDs(...)");
            oAction.setParameter("numRecords", iNum);

            oAction.execute().then(function () {
                MessageToast.show("Generated " + iNum + " UUIDs!");
                this.byId("uuidTable").getBinding("items").refresh();
            }.bind(this));
        },

        onExport: function () {
            var oTable = this.byId("uuidTable");
            var oRowBinding = oTable.getBinding("items");
            
            var aCols = [
                { label: 'Seq No', property: 'seqNo', type: exportLibrary.EdmType.Number },
                { label: 'UUID', property: 'generatedValue', type: exportLibrary.EdmType.String }
            ];

            var oSettings = {
                workbook: { columns: aCols },
                dataSource: oRowBinding,
                fileName: 'UUID_Data_Export.xlsx',
                worker: false 
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        }
    });
});
