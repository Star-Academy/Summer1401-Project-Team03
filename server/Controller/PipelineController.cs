﻿using System.Data.Common;
using a;
using Microsoft.AspNetCore.Mvc;
using server.Components;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Enums;
using server.file;
using server.Pipelines;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : ControllerBase
{
    private int _counter;
    private Dictionary<int, Pipeline> idToPipeline;

    [HttpPost]
    public IActionResult Create(string pipelineName)
    {
        try
        {
            var dbConfiguration = DBConfigLoader.Load();
            var pipeline = new Pipeline(pipelineName, dbConfiguration);

            _counter++;
            idToPipeline[_counter] = pipeline;
            return Ok(_counter);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    public IActionResult AddTransformer(int pipelineID, int previousComponentId, int nextComponentId, double x, double y,
        [FromBody] Dictionary<string, string> dictionary)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];

            var filter = new Filter(pipeline, new Position(x, y), dictionary["field"],
                dictionary["operator"].GetOperator(), dictionary["value"]);

            filter.PreviousComponents.Add(pipeline.IdToComponent[previousComponentId]);
            pipeline.IdToComponent[nextComponentId].PreviousComponents.Add(filter);
            pipeline.AddComponent(filter);

            return Ok(filter.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    public IActionResult AddSource(int pipelineID, int fileID, double x, double y)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, "imports");
            var extractor = new CSVExtractor(idToPipeline[pipelineID], new Position(x, y), filePath);

            idToPipeline[pipelineID].AddComponent(extractor);

            return Ok(extractor.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    public IActionResult AddDestination(int pipelineId, int fileID, double x, double y, int previousComponentId)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, "exports");
            var loader = new CSVLoader(idToPipeline[pipelineId], new Position(x, y), filePath);

            loader.PreviousComponents.Add(idToPipeline[pipelineId].IdToComponent[previousComponentId]);

            idToPipeline[pipelineId].AddComponent(loader);

            return Ok(loader.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpGet]
    public IActionResult Run(int pipelineID)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            pipeline.Execute();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    public ActionResult<DbDataReader> RunUpTo(int pipelineID, int componentID)
    {
        try
        {
            var pipeline = idToPipeline[pipelineID];
            return Ok(pipeline.Execute(componentID));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}