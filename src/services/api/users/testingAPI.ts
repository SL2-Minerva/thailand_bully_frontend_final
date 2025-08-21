import { CallAPI } from "src/services/CallAPI";

const GetShopDetail = () => {
    const [{data: res, loading, error}, refetch ] = CallAPI<{data?: any;}>({
      url: `/shop-detail/256`,
      method: "GET"
    });

    return {
      result_shop_detail: res?.data ||  null,
      loading_shop_detail: loading,
      error_shop_detail: error,
    }
  }

export default GetShopDetail
