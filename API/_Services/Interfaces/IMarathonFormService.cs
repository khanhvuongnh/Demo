using API.Dtos;
using API.Helpers.Utilities;

namespace API._Services.Interfaces
{
    public interface IMarathonFormService
    {
        Task<PaginationUtility<Marathon_FormDto>> GetAllForms(PaginationParam pagination);
        Task<Marathon_FormDto> GetForm(int record_ID);
        Task<OperationResult> UpdateForm(Marathon_FormDto formDto);
    }
}