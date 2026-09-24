import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Department } from "@/types";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {  useNavigate } from "react-router";

const DepartmentsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    let serarchFilters = searchQuery ? [{
        field: 'name', operator: 'contains' as const, value: searchQuery
    }] : [];
    const navigate = useNavigate();
    const departmentsTable = useTable<Department>({
        columns: useMemo<ColumnDef<Department>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: () => <p className="column-title" >Code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title" >Name</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'subjectsCount',
                accessorKey: 'subjectsCount',
                size: 150,
                header: () => <p className="column-title" >Subjects</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<number>()}</span>
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 300,
                header: () => <p className="column-title" >Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>
            },

            {
                id: 'view',
                size: 200,
                header: () => <p className="column-title" >Details</p>,
                cell: ({ row }) => <Button variant="outline" size="sm" onClick={() => {navigate(`/departments/${row.original.id}`)}}>
                    View
                </Button>

            }
        ], []),
        refineCoreProps: {
            resource: 'departments',
            pagination: { mode: 'server', pageSize: 10 },
            filters: {
                permanent: [...serarchFilters]
            },
            sorters: {
                initial: [
                    { field: 'id', order: 'desc' }
                ]
            }
        }
    })

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        departmentsTable.refineCore.setCurrentPage(1);
        setSearchQuery(event.target.value);
    }

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Departments</h1>
            <div className="intro-row">
                <p>Quick access to essential metrics and managements tools.</p>
                <div className="actions-row">
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="search-field mb-4">
                            <Search className="search-icon" />
                            <Input type="text" placeholder="Search by name ..." className="pl-10 w-full" value={searchQuery} onChange={handleSearchChange} />
                        </div>
                        <CreateButton />
                    </div>
                </div>
            </div>
            <DataTable table={departmentsTable} />
        </ListView>
    )
};

export default DepartmentsList;