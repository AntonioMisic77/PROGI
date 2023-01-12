using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Configuration;
using Backend.Data;
using Backend.Data.CommentDto;
using Backend.Data.MissingReportDTO;
using Backend.Services.Comment;
using Backend.Services.IdGenerator;
using Backend.Services.MissingReport;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace MapTasker.Tests.Services
{
    public class MissingReportAndCommentServiceTests
    {
        #region Helpers

        private async Task<MapTaskerDBContext> GetDbContext()
        {
            var dbOptions = new DbContextOptionsBuilder<MapTaskerDBContext>()
                           .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                           .Options;

            var dbContext = new MapTaskerDBContext(dbOptions);

            dbContext.Database.EnsureCreated();

            if (await dbContext.MissingReports.CountAsync() <= 0)
            {
                dbContext.MissingReports.Add(new Backend.Models.MissingReport
                {
                    Id = 1,
                    FirstName = "Pero",
                    LastName = "Peric",
                    Oib = 12345678910,
                    Photo = "http://123.jtr",
                    ReportedAt = DateTime.Now,
                });

                dbContext.MissingReports.Add(new Backend.Models.MissingReport
                {
                    Id = 2,
                    FirstName = "Perica",
                    LastName = "Peric",
                    Oib = 12345678911,
                    Photo = "http://123.jtr",
                    ReportedAt = DateTime.Now,
                });

                await dbContext.SaveChangesAsync();

                dbContext.Comments.Add(new Backend.Models.Comment
                {
                    Id=1,
                    ReportId = 1,
                    Text = "Vidio sam ga prije 15 min.",
                    UserOib = 12345678910
                });

                await dbContext.SaveChangesAsync();
            }

            return dbContext;
        }

        private async Task<IMapper> getMapper()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MapperConfing());

            });

            return mockMapper.CreateMapper();
        }

        #endregion

        [Fact]
        public async void MissingReport_GetAllMissingReports_GetsAllReports()
        {
            var context = await GetDbContext();
            var mapper = await getMapper();
            var generator = new IdGenerator();

            var service = new MissingReport(context,mapper,generator);

            var reports = service.GetAllMissingReports();

            Assert.Equal(2,reports.Count());
            Assert.IsType<List<MissingReportDto>>(reports);
        }

        [Fact]
        public async void MissingReport_CreateMissingReport_CreatesMissingReport()
        {
            var context = await GetDbContext();
            var mapper = await getMapper();
            var generator = new IdGenerator();

            var service = new MissingReport(context, mapper, generator);

            var missingReport = await service.CreateMissingReport(new MissingReportDto
            {
                Id = 3,
                FirstName = "Marko",
                LastName = "Maric",
                Oib = 12345678918,
                Photo = "https:asfjkh",
                Description = "Visok 180 plava majica zelene patike",
                ReportedAt = DateTime.Now,
            });

            Assert.IsType<MissingReportDto>(missingReport);
            Assert.Equal(3,context.MissingReports.Count());

        }

        [Fact]
        public async void CommentService_CreateComment_CreatesComment()
        {
            var context = await GetDbContext();
            var mapper = await getMapper();
            var generator = new IdGenerator();

            var service = new Comment(context,mapper,generator);

            var comment = await service.CreateComment(new CommentDto
            {
                Id = 2,
                ReportId = 1,
                Text = "Vidio mladica na glavnom kolodvoru."
            });

            Assert.IsType<CommentDto>(comment);
            Assert.Equal(2,context.Comments.Where(a=> a.ReportId == 1).Count());
        }
    }
}
