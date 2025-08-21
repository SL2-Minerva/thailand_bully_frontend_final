import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetSNA = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  messageId?: any,
  reportNo?: string,
  type?: string,
  fillter_keywords?: any,
  limit?: any
) => {
  let params: any = {}
  params = {
    campaign_id: campaignId || '',
    message_id: messageId || '',
    keyword_id: keywordId || '',
    report_number: reportNo || ''
  }

  if (
    period === 'customrange' &&
    end_date &&
    previousEndDate &&
    start_date !== end_date &&
    previousDate !== previousEndDate
  ) {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''

    params.start_date_period = previousDate ? moment(previousDate).format('YYYY-MM-DD') : ''
    params.end_date_period = previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : ''
    params.keyword_id = fillter_keywords
    params.type = type
  } else {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''
    params.keyword_id = fillter_keywords
    params.type = type
  }

  if (platformId) {
    params.source = platformId
  }

  if (fillter_keywords) {
    params.keyword_id = fillter_keywords
  }

  if (limit) {
    params.limit = limit
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/sna`,
    method: 'GET',
    params: params
  })

  const responseData = response?.data || []

  // const responseData = [
  //   {
  //     "id": "-gzvezr6lzY",
  //     "total_engagement": "40",
  //     "title": "THE STANDARD WEALTH",
  //     "color": "#EDF2F4",
  //     "size": 70,
  //     "link": "https://www.youtube.com/watch?v=-gzvezr6lzY",
  //     "items": [
  //       {
  //         "id": "UgxUDFrkoKlrOecWo5t4AaABAg",
  //         "total_engagement": 8,
  //         "title": "@singdada8111",
  //         "color": "#EDF2F4",
  //         "size": 25,
  //         "items": [
  //           {
  //             "id": "UgxUDFrkoKlrOecWo5t4AaABAg.A5V7jnkBI93A5VFNkdOaio",
  //             "total_engagement": 0,
  //             "title": "@susosu6070",
  //             "color": "#EDF2F4",
  //             "size": 10
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  const nodeData: any[] = []
  const edgeData: any[] = []
  const uniqueNodeIds = new Set<string>()
  const uniqueEdgeKeys = new Set<string>()

  for (let i = 0; i < responseData.length; i++) {
    processItem(responseData[i], uniqueNodeIds, uniqueEdgeKeys, nodeData, edgeData)
  }

  const snaData = {
    edges: edgeData ?? [],
    nodes: nodeData ?? []
  }

  return {
    resultSNAGraph: snaData,
    loadingSNAGraph: loading,
    errorNetworkGraph: error
  }
}

const processItem = (
  item: any,
  uniqueNodeIds: Set<string>,
  uniqueEdgeKeys: Set<string>,
  nodeData: any[],
  edgeData: any[],
  parentId?: string,
  parentLink?: string // New parameter to store the parent's link
) => {
  const node = {
    id: item?.id ?? '',
    label_name: item?.title ?? '',
    title: item?.title ?? '',
    color: item?.color ?? '#63A375',
    shape: 'dot',
    size: item?.size ?? 10,
    link_message: parentLink || item?.link || '', // Use parentLink if present, else use current node's link
    length: 10,
    parent_id: parentId
  }

  if (!uniqueNodeIds.has(node.id)) {
    uniqueNodeIds.add(node.id)
    nodeData.push(node)

    if (parentId) {
      const edgeKey = `${parentId}-${node.id}`
      if (!uniqueEdgeKeys.has(edgeKey)) {
        uniqueEdgeKeys.add(edgeKey)
        edgeData.push({
          from: node.id, 
          to: parentId,
          width: 5,
          length: 300,
          color: node.color,
          link_message: node.link_message
        })
      }
    }
  }

  if (item.items && item.items.length > 0) {
    for (let i = 0; i < item.items.length; i++) {
      processItem(
        item.items[i],
        uniqueNodeIds,
        uniqueEdgeKeys,
        nodeData,
        edgeData,
        node.id,
        node.link_message // Pass the current node's link_message to its children
      )
    }
  }
}
