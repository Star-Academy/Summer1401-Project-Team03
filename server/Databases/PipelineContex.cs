using DBConfig;
using Microsoft.EntityFrameworkCore;
using server.configurations;
using server.Pipelines;

namespace  server.Databases;

public class PipelineContex : DbContext
{
    public DbSet<PipelineInformation> PipelineInformations { get; set; }

    //private DBConfiguration _configuration = DBConfigLoader.Load();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(
            $"Host={DBConfigLoader.Load().Host};Database={DBConfigLoader.Load().Database};Username={DBConfigLoader.Load().Username};Password={DBConfigLoader.Load().Password}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PipelineInformation>().HasNoKey();
    }
}