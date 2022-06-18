using API._Services.Interfaces;
using API.Dtos;
using API.Helpers.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MarathonFormController : ApiController
    {
        private readonly IMarathonFormService _marathonFormService;

        public MarathonFormController(IMarathonFormService marathonFormService)
        {
            _marathonFormService = marathonFormService;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllForms([FromQuery] PaginationParam pagination)
        {
            var result = await _marathonFormService.GetAllForms(pagination);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetForm(int record_ID)
        {
            var result = await _marathonFormService.GetForm(record_ID);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateForm([FromBody] Marathon_FormDto formDto)
        {
            var result = await _marathonFormService.UpdateForm(formDto);
            return Ok(result);
        }
    }
}