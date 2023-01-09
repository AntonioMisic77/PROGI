using Backend.Data.MissingReportDTO;

namespace Backend.Services.MissingReport
{
    public interface IMissingReport
    {
        List<MissingReportDto> GetAllMissingReports();

        Task<MissingReportDto> CreateMissingReport(MissingReportDto dto);

        Task<MissingReportDto> UpdateMissingReport(MissingReportDto dto);

        Task<MissingReportDto> MarkPersonAsFound(int id);
    }
}

