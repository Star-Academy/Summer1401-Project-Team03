﻿namespace server.configurations;

public record DBConfiguration
{
    public string Host { get; set; }
    public string Username { get; set; }
    public string Database { get; set; }
    public string Password { get; set; }
}