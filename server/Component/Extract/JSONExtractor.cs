﻿namespace server.Extract;

public class JSONExtractor : IExtractor
{
    public List<string> Keys { get; set; }
    public string GetQuery()
    {
        throw new NotImplementedException();
    }

    public string TableName { get; set; }
    public void Extract(string dataPath)
    {
        throw new NotImplementedException();
    }
}