using API._Repositories;
using API._Services.Interfaces;
using API.Dtos;
using API.Helpers.Utilities;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API._Services.Services
{
    public class MarathonFormService : IMarathonFormService
    {
        private readonly IRepositoryAccessor _repositoryAccessor;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;

        public MarathonFormService(
            IRepositoryAccessor repositoryAccessor,
            IMapper mapper,
            MapperConfiguration mapperConfiguration)
        {
            _repositoryAccessor = repositoryAccessor;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
        }

        public async Task<PaginationUtility<Marathon_FormDto>> GetAllForms(PaginationParam pagination)
        {
            var formsQuery = _repositoryAccessor.Marathon_Form
                .FindAll(x => x.Status)
                .ProjectTo<Marathon_FormDto>(_mapperConfiguration);
            return await PaginationUtility<Marathon_FormDto>.CreateAsync(formsQuery, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<Marathon_FormDto> GetForm(int record_ID)
        {
            var form = _mapper.Map<Marathon_FormDto>(await _repositoryAccessor.Marathon_Form.FindById(record_ID));
            return form;
        }

        public async Task<OperationResult> UpdateForm(Marathon_FormDto formDto)
        {
            var form = _mapper.Map<Marathon_Form>(formDto);

            try
            {
                _repositoryAccessor.Marathon_Form.Update(form);
                await _repositoryAccessor.Save();
                return new OperationResult(true);
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}