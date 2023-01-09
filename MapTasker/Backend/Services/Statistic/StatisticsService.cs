
using AutoMapper;
using Backend.Data;
using Backend.Data.StatisticDto;

namespace Backend.Services.StatisticsService
{
    public class StatisticsService : IStatisticsService
    {
        private readonly MapTaskerDBContext _context;

        public StatisticsService(MapTaskerDBContext context)
        {
            _context = context;
        }

        public StatisticDto getStatistics()
        {
            var missingPeople = new int[7];
            var foundPeople = new int[7];
            var unsearchedBuildings = new int[7];
            var searchedBuildings = new int[7];

            var missingReports = _context.MissingReports.ToList();
            var buildings = _context.Buildings.ToList();
            var areas = _context.Areas.ToList();

            for (int i = 0; i < 7; i++)
            {
                DateTime currentDate = DateTime.Today.AddDays(i-5);
                missingPeople[i] = missingReports.Where(mr => mr.ReportedAt.CompareTo(currentDate) < 0
                                                        && (mr.FoundAt == null || mr.FoundAt.GetValueOrDefault().CompareTo(currentDate) > 0)).Count();
                foundPeople[i] = missingReports.Where(mr => mr.FoundAt != null && mr.FoundAt.GetValueOrDefault().CompareTo(currentDate) < 0).Count();

                unsearchedBuildings[i] = areas.Where(a => buildings.Exists(b => b.AreaId == a.Id)
                                                        && a.CreatedAt.CompareTo(currentDate) < 0
                                                        && (a.ClosedAt == null || a.ClosedAt.GetValueOrDefault().CompareTo(currentDate) > 0)).Count();

                searchedBuildings[i] = areas.Where(a => buildings.Exists(b => b.AreaId == a.Id)
                                                        && a.ClosedAt != null && a.ClosedAt.GetValueOrDefault().CompareTo(currentDate) < 0).Count();
            }
            return new StatisticDto
            {
                foundPeople = foundPeople,
                searchedBuildings = searchedBuildings,
                unsearchedBuildings = unsearchedBuildings,
                missingPeople = missingPeople,
            };
        }
    }
}
