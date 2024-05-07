'use client'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Analytics from '@/app/(DashboardLayout)/components/shared/Analytics';

const Dashboard = ({ params }) => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard" lang={params.lang}>
      <Analytics/>
    </PageContainer>
  )
}

export default Dashboard;
