
using Backend.Data.MissingReportDTO;

namespace Backend.Services.MissingReport
{
    public interface IMissingReport
    {
        Task<List<MissingReportDto>> GetAllMissingReports();
    }
}
