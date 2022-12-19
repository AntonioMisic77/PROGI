using AutoMapper;
using Backend.Data;
using Backend.Data.MissingReportDTO;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.MissingReport
{
    public class MissingReport : IMissingReport
    {

        private MapTaskerDBContext _context;
        private readonly IMapper _mapper;

        public MissingReport(MapTaskerDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MissingReportDto> CreateMissingReport(MissingReportDto dto)
        {
            byte[] newGuid = Guid.NewGuid().ToByteArray();

            int id = Math.Abs(BitConverter.ToInt32(newGuid, 0));

            var missingReport = new Models.MissingReport
            {
                Id = id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Oib = dto.Oib,
                Photo = dto.Photo,
                Description = dto.Description,
                ReportedAt = DateTime.UtcNow,
            };

            await _context.AddAsync(missingReport);
            await _context.SaveChangesAsync();

            return _mapper.Map<MissingReportDto>(missingReport);
        }

        public async Task<MissingReportDto> DeleteMissingReport(int id)
        {
            var missingReport = await _context.MissingReports.FindAsync(id);

            if (missingReport == null)
            {
                throw new InvalidDataException("No such missing report");
            }
            _context.Remove(missingReport);

            await _context.SaveChangesAsync();

            return _mapper.Map<MissingReportDto>(missingReport);
        }

        public List<MissingReportDto> GetAllMissingReports()
        {
            var missingReports = _context.MissingReports.Include(a => a.Comments);

            return _mapper.Map<List<MissingReportDto>>(missingReports);
        }

        public async Task<MissingReportDto> UpdateMissingReport(MissingReportDto dto)
        {
            var missingReport = _context.MissingReports.Find(dto.Id);

            if (missingReport == null)
            {
                throw new InvalidDataException("No such missing report");
            }

            
            missingReport.Description = dto.Description;
            missingReport.FoundAt = DateTime.UtcNow;

            _context.Attach(missingReport);
            _context.Entry(missingReport).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<MissingReportDto>(missingReport);

        }
    }
}

