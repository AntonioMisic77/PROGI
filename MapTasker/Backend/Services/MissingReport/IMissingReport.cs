using Backend.Data.MissingReportDto;

using Backend.Data.MissingReportDTO;

namespace Backend.Services.MissingReport
{
    public interface IMissingReport
    {
        Task<List<MissingReportDto>> GetAllMissingReports();

        Task<List<MissingReportDto>> CreateMissingReport();

        Task<List<MissingReportDto>> UpdateMissingReport(MissingReportDto dto);

        Task<List<MissingReportDto>> DeleteMissingReport(int id);
    }
}

