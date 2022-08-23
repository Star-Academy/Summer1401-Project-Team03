﻿using server.Pipelines;

namespace server.Components.Transformers;

public abstract class Mutator : Transformer
{
    public Mutator(Pipeline pipeline) : base(pipeline)
    {
        TableName = Pipeline.TableManager.NewTableName();
    }

    public string TableName { set; get; }

    public override string GetTable()
    {
        return TableName;
    }

    public abstract void Mutate();
}