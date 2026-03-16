using { my.uuidapp as uuidapp } from '../db/schema';

service UUIDService {
    @readonly entity UUIDs as projection on uuidapp.UUIDStorage;
    action generateUUIDs (
        @title: 'How many UUIDs?' numRecords : Integer
    ) returns String;
}

annotate UUIDService.UUIDs with @(
    UI.LineItem : [
        { $Type: 'UI.DataFieldForAction', Action: 'UUIDService.generateUUIDs', Label: 'Generate UUIDs', InvocationGrouping: #ChangeSet },
        { Value: seqNo, Label: 'Seq No' },
        { Value: generatedValue, Label: 'Generated UUID' }
    ],
    UI.HeaderInfo : {
        TypeName: 'UUID', TypeNamePlural: 'UUIDs',
        Title: { Value: 'UUID Generator' }
    }
);

annotate UUIDService.generateUUIDs with @(
    Common.SideEffects : { TargetEntities : ['UUIDService.UUIDs'] }
);