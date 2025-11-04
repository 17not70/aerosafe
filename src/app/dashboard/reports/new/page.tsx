
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  addDocumentNonBlocking,
  useAuth,
  useFirestore,
} from '@/firebase';
import { collection } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const reportSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['VSR', 'MOR']),
  severity: z.number().min(1).max(5),
  probability: z.number().min(1).max(5),
  hazardType: z.string().min(1, 'Please select a hazard type.'),
  isAnonymous: z.boolean().default(false),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function NewReportPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isAnonymousSubmission = searchParams.get('anonymous') === 'true';

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      type: isAnonymousSubmission ? 'VSR' : 'MOR',
      severity: 3,
      probability: 3,
      hazardType: '',
      isAnonymous: isAnonymousSubmission,
    },
  });

  const onSubmit = (values: ReportFormValues) => {
    let reporter_id: string;
    let reportType = values.type;

    if (values.isAnonymous) {
        reporter_id = `anon_${uuidv4()}`;
        reportType = 'VSR';
    } else {
        if (!auth.currentUser) {
          console.error("User not logged in for non-anonymous report");
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to submit this type of report.",
          });
          router.push('/login');
          return;
        }
        reporter_id = auth.currentUser.uid;
    }

    const reportData = {
      title: values.title,
      description: values.description,
      type: reportType,
      severity: values.severity,
      probability: values.probability,
      hazardType: values.hazardType,
      risk_index: values.severity * values.probability,
      reporter_id: reporter_id,
      created_at: new Date().toISOString(),
      action_status: 'Open',
    };
    
    const reportsCollection = collection(firestore, 'reports');
    addDocumentNonBlocking(reportsCollection, reportData);
    
    toast({
      title: "Report Submitted",
      description: "Your safety report has been successfully submitted.",
    });
    
    if (values.isAnonymous || (auth.currentUser && auth.currentUser.isAnonymous)) {
        router.push('/'); // Go back to home for anonymous users
    } else {
        router.push('/dashboard/reports');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>New Safety Report</CardTitle>
          <CardDescription>
            {isAnonymousSubmission 
              ? "Submit a new Voluntary Safety Report (VSR). Your submission is anonymous."
              : "Submit a new Mandatory Occurrence Report (MOR) or a voluntary report as a logged-in user."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Near mid-air collision on approach" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short, descriptive title for the report.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the event..."
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include all relevant details, such as location, time, aircraft involved, and sequence of events.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isAnonymousSubmission}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a report type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="VSR">Voluntary Safety Report (VSR)</SelectItem>
                          <SelectItem value="MOR">Mandatory Occurrence Report (MOR)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hazardType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hazard Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hazard category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Runway Incursion">Runway Incursion</SelectItem>
                          <SelectItem value="Airspace Infringement">Airspace Infringement</SelectItem>
                          <SelectItem value="Weather">Weather</SelectItem>
                          <SelectItem value="Aircraft-System">Aircraft System Malfunction</SelectItem>
                          <SelectItem value="Human-Factors">Human Factors</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="probability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Probability: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              </div>
              
              {!isAnonymousSubmission && auth.currentUser && (
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Submit this report anonymously
                        </FormLabel>
                        <FormDescription>
                          If checked, this will be submitted as a VSR and your user information will not be attached.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}
              
              <Button type="submit">Submit Report</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
