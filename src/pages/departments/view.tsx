import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Department, Subject } from "@/types";
import { useShow } from "@refinedev/core";
import { useNavigate, useParams } from "react-router";
import { BookOpen, GraduationCap, Layers3, UsersRound } from "lucide-react";
import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

type DepartmentDetails = Department & {
    classesCount?: number;
    teachersCount?: number;
    studentsCount?: number;
};

const DepartmentViewPage: React.FC = () => {
    useParams<{ id: string }>();
    const { query } = useShow<DepartmentDetails>({
        resource: "departments",
    });
    const department = query.data?.data;
    const navigate = useNavigate();

    const metrics = [
        { label: "Total Subjects", value: department?.subjectsCount ?? 0, icon: BookOpen },
        { label: "Total Classes", value: department?.classesCount ?? 0, icon: Layers3 },
        { label: "Teachers", value: department?.teachersCount ?? 0, icon: UsersRound },
        { label: "Enrolled Students", value: department?.studentsCount ?? 0, icon: GraduationCap },
    ];

    const subjectTable = useTable<Subject>({
        columns: useMemo(() => [
            {
                id: "code",
                accessorKey: "code",
                size: 100,
                header: () => <p className="column-title">Code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
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
                id: 'description',
                accessorKey: 'description',
                size: 300,
                header: () => <p className="column-title" >Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>
            },
            {
                id: 'details',
                size: 100,
                header: () => <p className="column-title" >Details</p>,
                cell: ({ row }) => <Button variant="outline" size="sm" onClick={() => { navigate(`/subjects/${row.original.id}`) }}>
                    View
                </Button>
            }
        ], []),
        refineCoreProps: {
            resource: `departments/${department?.id}/subjects`,
            pagination: { pageSize: 10, mode: 'server' },
        }
    });

    if (query.isLoading) {
        return <ShowView><ShowViewHeader title="Department" />Loading Department Details...</ShowView>;
    }

    if (query.isError || !department) {
        return (
            <ShowView>
                <ShowViewHeader title="Department" />
                <Card>
                    <CardContent className="py-10 text-center text-sm text-muted-foreground">
                        Department details could not be loaded.
                    </CardContent>
                </Card>
            </ShowView>
        );
    }

    return (
        <ShowView className="pb-8">
            <ShowViewHeader title={department.name} />

            <Card className="mt-4">
                <CardHeader className="gap-2">
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                        {department.description || "No description has been added for this department."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex min-h-24 items-start justify-between rounded-lg border bg-background p-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                            </div>
                            <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                    ))}
                </CardContent>
            </Card>


            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Subjects</CardTitle>
                    <CardAction>
                        <Badge>{department.subjectsCount}</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <DataTable table={subjectTable} />
                </CardContent>
            </Card>
        </ShowView>
    );
};

export default DepartmentViewPage;