using Backend.Data.MissingReport;

namespace Backend.Services.MissingReport
{
    public interface IMissingReport
    {
        Task<List<MissingReportDto>> GetAllMissingReports();
    }
}
