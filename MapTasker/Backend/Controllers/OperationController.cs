﻿
using Backend.Data.Areas;
using Backend.Data.OperationDTO;
using Backend.Data.UserDtos;
using Backend.Services.Operation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private readonly IOperation _operationService;

        public OperationController(IOperation operationService)
        {
            _operationService = operationService;
        }

        [HttpPost]

        public async Task<ActionResult<OperationDto>> CreateOperation(OperationDto operation)
        {
            try
            {
                 return Ok(await _operationService.CreateOperation(operation));
            } 
            catch (Exception e) 
            { 
                 return BadRequest(e);
            }
           
        }

        [HttpPut]

        public async Task<ActionResult<OperationDto>> UpdateOperation(OperationDto operation)
        {   
            try
            {
                 return Ok(await _operationService.UpdateOperation(operation));
            } 
            catch (Exception e) 
            { 
                 return BadRequest(e);
            }
           
        }

        [HttpGet]
        public ActionResult<AllAreasDto> GetAllAreas()
        {
            return Ok(_operationService.GetAllAreas());
        }
    }
}
