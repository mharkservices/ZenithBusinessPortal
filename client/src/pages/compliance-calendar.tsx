import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Compliance events data
const complianceEvents = {
  'Corporate': [
    { date: new Date(2025, 8, 30), title: 'Annual General Meeting (AGM)', description: 'Shareholder\'s meeting to approve financial statements, auditor\'s appointment and dividend declaration', category: 'Corporate', type: 'Yearly' },
    { date: new Date(2025, 5, 30), title: 'DPT-3', description: 'Annual return to be submitted to ROC stating the money taken by company not in the form of deposits', category: 'Corporate', type: 'Yearly' },
    { date: new Date(2025, 8, 30), title: 'DIR-3 KYC', description: 'KYC form for all directors', category: 'Corporate', type: 'Yearly' },
    { date: new Date(2025, 6, 15), title: 'Annual return on Foreign Assets & Liabilities (FLA)', description: 'Annual return on foreign assets and liabilities to be submitted with Reserve Bank of India', category: 'Corporate', type: 'Yearly' },
    { date: new Date(2025, 3, 30), title: 'MSME Return (Oct-Mar)', description: 'Half-yearly return for informing outstanding payment to micro and small-scale vendors', category: 'Corporate', type: 'Half-Yearly' },
    { date: new Date(2025, 9, 30), title: 'MSME Return (Apr-Sep)', description: 'Half-yearly return for informing outstanding payment to micro and small-scale vendors', category: 'Corporate', type: 'Half-Yearly' },
  ],
  'Tax': [
    { date: new Date(2025, 5, 15), title: 'Advance Tax - First Quarter', description: 'Quarterly advance tax payment for corporate income tax', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2025, 8, 15), title: 'Advance Tax - Second Quarter', description: 'Quarterly advance tax payment for corporate income tax', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2025, 11, 15), title: 'Advance Tax - Third Quarter', description: 'Quarterly advance tax payment for corporate income tax', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2026, 2, 15), title: 'Advance Tax - Fourth Quarter', description: 'Quarterly advance tax payment for corporate income tax', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2025, 9, 31), title: 'Income Tax Return Filing', description: 'Annual return of income (Federal)', category: 'Tax', type: 'Yearly' },
    { date: new Date(2025, 6, 31), title: 'Withholding Tax Return - Q1', description: 'Quarterly withholding tax return filing', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2025, 9, 31), title: 'Withholding Tax Return - Q2', description: 'Quarterly withholding tax return filing', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2026, 0, 31), title: 'Withholding Tax Return - Q3', description: 'Quarterly withholding tax return filing', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2026, 4, 31), title: 'Withholding Tax Return - Q4', description: 'Quarterly withholding tax return filing', category: 'Tax', type: 'Quarterly' },
    { date: new Date(2026, 4, 31), title: 'Specified Financial Transactions Form 61A', description: 'Annual filing for specified financial transactions', category: 'Tax', type: 'Yearly' },
  ],
  'GST': [
    { date: new Date(2025, 6, 11), title: 'GSTR-1 - July', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 7, 11), title: 'GSTR-1 - August', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 8, 11), title: 'GSTR-1 - September', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 9, 11), title: 'GSTR-1 - October', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 10, 11), title: 'GSTR-1 - November', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 11, 11), title: 'GSTR-1 - December', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 0, 11), title: 'GSTR-1 - January', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 1, 11), title: 'GSTR-1 - February', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 2, 11), title: 'GSTR-1 - March', description: 'Monthly return for outward supplies', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 6, 20), title: 'GSTR-3B - July', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 7, 20), title: 'GSTR-3B - August', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 8, 20), title: 'GSTR-3B - September', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 9, 20), title: 'GSTR-3B - October', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 10, 20), title: 'GSTR-3B - November', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2025, 11, 20), title: 'GSTR-3B - December', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 0, 20), title: 'GSTR-3B - January', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 1, 20), title: 'GSTR-3B - February', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
    { date: new Date(2026, 2, 20), title: 'GSTR-3B - March', description: 'Monthly summary return', category: 'GST', type: 'Monthly' },
  ]
};

// Helper function to check if date has any events and return the category
const getComplianceEventCategory = (date: Date) => {
  for (const category in complianceEvents) {
    const events = complianceEvents[category as keyof typeof complianceEvents];
    for (const event of events) {
      if (
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear()
      ) {
        return category;
      }
    }
  }
  return null;
};

// Helper function to check if date has any events
const hasComplianceEvent = (date: Date) => {
  return getComplianceEventCategory(date) !== null;
};

// Helper function to get events for a specific date
const getEventsForDate = (date: Date) => {
  const events = [];
  for (const category in complianceEvents) {
    const categoryEvents = complianceEvents[category as keyof typeof complianceEvents];
    for (const event of categoryEvents) {
      if (
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear()
      ) {
        events.push(event);
      }
    }
  }
  return events;
};

// Helper function to get events for a specific month
const getEventsForMonth = (month: number, year: number, selectedCategory: string) => {
  const events = [];
  const categories = selectedCategory === 'All' 
    ? ['Corporate', 'Tax', 'GST'] 
    : [selectedCategory];
  
  for (const category of categories) {
    const categoryEvents = complianceEvents[category as keyof typeof complianceEvents];
    if (categoryEvents) {
      for (const event of categoryEvents) {
        if (
          event.date.getMonth() === month &&
          event.date.getFullYear() === year
        ) {
          events.push(event);
        }
      }
    }
  }
  
  return events;
};

const ComplianceCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2023');
  
  const currentMonth = date ? date.getMonth() : new Date().getMonth();
  const currentYear = date ? date.getFullYear() : new Date().getFullYear();
  
  const monthlyEvents = getEventsForMonth(currentMonth, currentYear, selectedCategory);
  const selectedDateEvents = date ? getEventsForDate(date) : [];

  return (
    <>
      <Helmet>
        <title>Compliance Calendar | Zenithfilings</title>
        <meta name="description" content="Stay on top of your business compliance requirements with our comprehensive compliance calendar." />
      </Helmet>
      
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Compliance Calendar</h1>
          <p className="text-xl max-w-3xl">
            Stay on top of your business compliance requirements with our comprehensive calendar of important dates and deadlines.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Tax">Tax</SelectItem>
                <SelectItem value="GST">GST</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025-2026</SelectItem>
                <SelectItem value="2026">2026-2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Corporate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Tax</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>GST</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view compliance deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    corporateEvent: (date) => getComplianceEventCategory(date) === 'Corporate',
                    taxEvent: (date) => getComplianceEventCategory(date) === 'Tax',
                    gstEvent: (date) => getComplianceEventCategory(date) === 'GST',
                  }}
                  modifiersStyles={{
                    corporateEvent: { 
                      fontWeight: 'bold',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      borderBottom: '2px solid #3b82f6',
                      cursor: 'pointer',
                      transform: 'scale(1.1)',
                    },
                    taxEvent: { 
                      fontWeight: 'bold',
                      backgroundColor: '#f0fdf4',
                      color: '#16a34a',
                      borderBottom: '2px solid #22c55e',
                      cursor: 'pointer',
                      transform: 'scale(1.1)',
                    },
                    gstEvent: { 
                      fontWeight: 'bold',
                      backgroundColor: '#faf5ff',
                      color: '#9333ea',
                      borderBottom: '2px solid #a855f7',
                      cursor: 'pointer',
                      transform: 'scale(1.1)',
                    }
                  }}
                  month={date}
                  onDayClick={(day) => {
                    if (hasComplianceEvent(day)) {
                      setDate(day);
                      // Auto-switch to the "selected" tab when clicking a date with events
                      const tabElement = document.querySelector('[data-value="selected"]') as HTMLElement;
                      if (tabElement) tabElement.click();
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="month" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="month">Monthly View</TabsTrigger>
                <TabsTrigger value="selected">Selected Date</TabsTrigger>
              </TabsList>
              
              <TabsContent value="month" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {date?.toLocaleString('default', { month: 'long' })} {date?.getFullYear()} Compliances
                    </CardTitle>
                    <CardDescription>
                      {monthlyEvents.length} compliance deadlines this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {monthlyEvents.length > 0 ? (
                      <div className="space-y-4">
                        {monthlyEvents.map((event, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge className={`
                                ${event.category === 'Corporate' ? 'bg-blue-500' : ''}
                                ${event.category === 'Tax' ? 'bg-green-500' : ''}
                                ${event.category === 'GST' ? 'bg-purple-500' : ''}
                              `}>
                                {event.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <i className="ri-calendar-line text-primary"></i>
                                <span className="text-sm font-medium">
                                  {event.date.toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="ri-repeat-line text-primary"></i>
                                <span className="text-sm">{event.type}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No compliance deadlines found for this month with the selected filters.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="selected" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {date?.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </CardTitle>
                    <CardDescription>
                      {selectedDateEvents.length} compliance deadlines on this date
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateEvents.map((event, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge className={`
                                ${event.category === 'Corporate' ? 'bg-blue-500' : ''}
                                ${event.category === 'Tax' ? 'bg-green-500' : ''}
                                ${event.category === 'GST' ? 'bg-purple-500' : ''}
                              `}>
                                {event.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-1">
                              <i className="ri-repeat-line text-primary"></i>
                              <span className="text-sm">{event.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No compliance deadlines for this date.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Need Help With Compliance?</CardTitle>
              <CardDescription>
                Stay compliant with regulatory requirements with our expert assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                At Zenithfilings, we understand that keeping track of all compliance requirements can be overwhelming.
                Our experts can help you navigate the complex regulatory landscape and ensure your business remains compliant.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-primary mt-1"></i>
                  <span>Personalized compliance calendar for your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-primary mt-1"></i>
                  <span>Timely reminders for upcoming deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-primary mt-1"></i>
                  <span>Expert assistance with filing and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-primary mt-1"></i>
                  <span>Regular updates on regulatory changes</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <a 
                href="/contact"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Our Compliance Experts
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ComplianceCalendar;
