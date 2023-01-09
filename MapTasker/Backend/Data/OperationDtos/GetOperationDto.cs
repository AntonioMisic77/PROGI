using Backend.Data.RegionDtos;
using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.OperationDtos
{
    public class GetOperationDto
    {
        public int Id { get; set; }

        public string Status { get; set; } = null!;

        public long LeaderOib { get; set; }

        public string Name { get; set; }
    }
}
