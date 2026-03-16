const cds = require('@sap/cds')
const { v4: uuidv4 } = require('uuid')

module.exports = (srv) => {
    const { UUIDs } = srv.entities

    srv.on('generateUUIDs', async (req) => {
        console.log("===> Action Triggered: Generating UUIDs...");
        const { numRecords } = req.data

        // 1. Delete existing records
        await DELETE.from(UUIDs)

        // 2. Generate new array
        const entries = Array.from({ length: numRecords || 500 }, (_, i) => ({
            seqNo: i + 1,
            generatedValue: uuidv4()
        }))

        // 3. Batch insert
        await INSERT.into(UUIDs).entries(entries)
        
        console.log(`===> Successfully inserted ${entries.length} records.`);
        return `Generated ${entries.length} UUIDs!`
    })
}