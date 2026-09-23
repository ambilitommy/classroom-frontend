import { DataProvider, GetListParams, BaseRecord, GetListResponse } from "@refinedev/core";
import { mockSubjects } from "@/constants/mock-data";

// export const dataProvider: DataProvider = {
//   getList: async<TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
//     if (resource !== 'subjects') {
//       return { data: [] as TData[], total: 0 };
//     }
//     return {
//       data: mockSubjects as unknown as TData[],
//       total: mockSubjects.length
//     }
//   },

//   getOne: async()=> {throw new Error("This function is not present in mock")},
//   create: async()=> {throw new Error("This function is not present in mock")},
//   update: async()=> {throw new Error("This function is not present in mock")},
//   deleteOne: async()=> {throw new Error("This function is not present in mock")},
//   getApiUrl: ()=> ''
// }


import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";
import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";
const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string | number> = { page, limit: pageSize };
      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';
        const value = String(filter.value);
        if (resource === 'subjects') {
          if (field === 'department') params.department = value;
          if (field === 'name' || field === 'code') params.search = value;
        }
      });
      return params;
    },
    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },
    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.totalCount ?? 0;
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };