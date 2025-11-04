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
import { useRouter } from 'next/navigation';
import { serverTimestamp } from 'firebase/firestore';
import React from 'react';

const reportSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  type: z.enum(['VSR', 'MOR']),
  severity: z.number().min(1).max(5),
  probability: z.number().min(1).max(5),
  hazardType: z.string().min(1, 'Please select a hazard type.'),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function NewReportPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'VSR',
      severity: 3,
      probability: 3,
      hazardType: '',
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    if (!auth.currentUser) {
      // Handle case where user is not logged in
      console.error("User not logged in");
      return;
    }
    const reportData = {
      ...values,
      risk_index: values.severity * values.probability,
      reporter_id: auth.currentUser.uid,
      created_at: new Date().toISOString(),
      action_status: 'Open',
    };
    
    const reportsCollection = collection(firestore, 'reports');
    await addDocumentNonBlocking(reportsCollection, reportData);
    router.push('/dashboard/reports');
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>New Safety Report</CardTitle>
          <CardDescription>
            Submit a new Voluntary (VSR) or Mandatory (MOR) Safety Report.
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
              
              <Button type="submit">Submit Report</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
