// ** Icon imports
import CogOutline from 'mdi-material-ui/CogOutline'
import HomeAnalytics from 'mdi-material-ui/HomeAnalytics'
import Pin from 'mdi-material-ui/Pin'
import Finance from 'mdi-material-ui/Finance'

// import { NewspaperVariantMultiple } from 'mdi-material-ui'
// import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import { Security, ClipboardTextClockOutline, HelpCircleOutline} from 'mdi-material-ui'

// TableOfContents

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { UserPermission } from 'src/services/api/users/role'

import { title } from 'process'
import { path } from 'd3'

const navigation = (): VerticalNavItemsType => {
  const {
    resultPermission,
    showOverallDashboard,
    showVoiceDashboard,
    showChannelDashboard,
    showBullyDashboard,
    showEngagementDashboard,
    showSentimentDashboard,
    showWordCloud,
    showSNA,

    //showMonitoringDashboard,

    // showCorpus,
    showActivityLog,
    showSNAByBullyLevel,
    showSNAByBullyType,
    showSNABySentiment,
    resultIsAdmin,

    // showContentManagement,
    showfaq
  } = UserPermission()

  const userMgt = {
    title: 'User MGT',
    path: '/apps/user/list'
  }

  const userRoleMgt = {
    title: 'User Role MGT',
    path: '/apps/user/list/roleManagement'
  }

  const organizedGroupMGT = {
    title: 'Organized Group MGT',
    path: '/organized-mgt/organized-group'
  }

  const organizedTypeMGT = {
    title: 'Organized Type MGT',
    path: '/organized-mgt/organized-type'
  }

  const organizedMgt = {
    title: 'Organized MGT',
    path: '/organized-mgt/management'
  }

  const overallDashboard = {
    title: 'Overall Dashboard',
    path: '/dashboard/overall'
  }

  const voiceDashboard = {
    title: 'Message Dashboard',
    path: '/VoiceDashboard'
  }

  const channelDashboard = {
    title: 'Channel Dashboard',
    path: '/ChannelDashboard'
  }

  const engagementDashboard = {
    title: 'Engagement Dashboard',
    path: '/EngagementDashboard'
  }

  const sentimentDashboard = {
    title: 'Sentiment Dashboard',
    path: '/SentimentDashboard'
  }

  const bullyDashboard = {
    title: 'Bully Dashboard',
    path: '/BullyDashboard'
  }

  // const monitoringDashboard = {
  //   title: 'Monitoring Dashboard',
  //   path: '/MonitoringDashboard'
  // }

  const wordCloudDashboard = {
    title: 'Word Clouds',
    path: '/WordCloud'
  }

  const snaBySentiment = {
    title: 'By Sentiment',
    path: '/SNA'
  }

  const SNAByBullyLevel = {
    title: 'By Bully Level',
    path: '/SNA/SNAByBullyLevel'
  }

  const SNAByBullyType = {
    title: 'By Bully Type',
    path: '/SNA/SNAByBullyType'
  }

  // const ContentMgt = [
  //   {
  //     title: 'Content',
  //     path: '/content/homepage'
  //   }
  // ]

  const userPermissionList: any[] = []
  const organizedList: any[] = []
  if (resultIsAdmin || resultPermission?.user?.authorized_view) {
    userPermissionList.push(userMgt)
  }

  if (resultIsAdmin || resultPermission?.user_role?.authorized_view) {
    userPermissionList.push(userRoleMgt)
  }

  if (resultIsAdmin || resultPermission?.organized_group_mgt?.authorized_view) {
    organizedList.push(organizedGroupMGT)
  }

  if (resultIsAdmin || resultPermission?.organized_type_mgt?.authorized_view) {
    organizedList.push(organizedTypeMGT)
  }

  if (resultIsAdmin || resultPermission?.organized_mgt?.authorized_view) {
    organizedList.push(organizedMgt)
  }

  const snaList: any[] = []

  if (showSNABySentiment || resultIsAdmin) {
    snaList.push(snaBySentiment)
  }

  if (showSNAByBullyLevel || resultIsAdmin) {
    snaList.push(SNAByBullyLevel)
  }

  if (showSNAByBullyType || resultIsAdmin) {
    snaList.push(SNAByBullyType)
  }

  // if (resultIsAdmin || showContentManagement) {
  //   ContentMgt.push({
  //     title: 'Content-MGT',
  //     path: '/content/content-mgt'
  //   })
  // }

  const sna = {
    title: 'SNA',
    children: snaList
  }

  const notice = {
    title: 'Privacy Notice',
    icon: Security,
    path: '/privacy'
  }

  const reportDashboardList: any[] = []

  if (showOverallDashboard) {
    reportDashboardList.push(overallDashboard)
  }
  if (showVoiceDashboard) {
    reportDashboardList.push(voiceDashboard)
  }
  if (showChannelDashboard) {
    reportDashboardList.push(channelDashboard)
  }
  if (showEngagementDashboard) {
    reportDashboardList.push(engagementDashboard)
  }
  if (showSentimentDashboard) {
    reportDashboardList.push(sentimentDashboard)
  }
  if (showBullyDashboard) {
    reportDashboardList.push(bullyDashboard)
  }

  if (showWordCloud) {
    reportDashboardList.push(wordCloudDashboard)
  }

  // if (resultIsAdmin || showMonitoringDashboard) {
  //   reportDashboardList.push(monitoringDashboard)
  // }

  if (showSNA || resultIsAdmin) {
    reportDashboardList.push(sna)
  }

  const UserPermissionData =
    userPermissionList.length > 0
      ? {
          title: 'User Permission',
          icon: CogOutline,
          children: userPermissionList
        }
      : null

  const OrganizationPermission =
    organizedList.length > 0
      ? {
          title: 'Organized MGT',
          icon: HomeAnalytics,
          children: organizedList
        }
      : null

  const sourceMgt = resultIsAdmin
    ? {
        title: 'Source MGT',
        path: '/campaign/source-mgt'
      }
    : null

  const domainMgt = resultIsAdmin
    ? {
        title: 'Domain MGT',
        path: '/campaign/domain-mgt'
      }
    : null

  // const ContentPermission = {
  //   title: 'Content',
  //   icon: TableOfContents,
  //   children: ContentMgt
  // }

  const campaignMenu = []

  if (sourceMgt) {
    campaignMenu.push(sourceMgt)
  }

  if (domainMgt) {
    campaignMenu.push(domainMgt)
  }

  campaignMenu.push({
    title: 'Campaign MGT',
    path: '/campaign/campaign-mgt'
  })

  const CampaignPermission = resultPermission?.campaign?.authorized_view
    ? {
        title: 'Campaign MGT',
        icon: Pin,
        children: campaignMenu
      }
    : null

  const ReportPermission = resultPermission?.report?.authorized_view
    ? {
        title: 'Reports',
        icon: Finance,
        children: reportDashboardList
      }
    : null

  // const LinkOut = {
  //   title: 'Corpus',
  //   icon: VectorArrangeBelow,
  //   openInNewTab: true,
  //   externalLink: true,
  //   path: 'http://202.44.231.31:8080'

  //   // path: 'http://onlinecorpus.net'
  // }

  const log = {
    title: 'Activity Log',
    path: '/ActivityLog',
    icon: ClipboardTextClockOutline
  }

  const faq = {
    title: 'FAQ',
    path: '/content/homepage',
    icon: HelpCircleOutline
  }

  const sideMenuBar: any[] = []

  if (UserPermissionData) {
    sideMenuBar.push(UserPermissionData)
  }

  if (OrganizationPermission) {
    sideMenuBar.push(OrganizationPermission)
  }

  if (CampaignPermission) {
    sideMenuBar.push(CampaignPermission)
  }

  if (ReportPermission) {
    sideMenuBar.push(ReportPermission)
  }

  // if (ContentPermission) {
  //   sideMenuBar.push(ContentPermission)
  // }

  if (resultIsAdmin || showActivityLog) {
    sideMenuBar.push(log)
  }

    if (resultIsAdmin || showfaq) {
    sideMenuBar.push(faq)
  }

  // if ((resultIsAdmin || showCorpus) && LinkOut) {
  //   sideMenuBar.push(LinkOut)
  // }

  sideMenuBar.push(notice)

  return sideMenuBar
}

export default navigation
