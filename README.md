# wave-sight 

# 專案應用
組件以React Hooks 編寫,React-Bootstrap做為樣式.
資料管理使用Redux-saga,主要處理資料庫數據.
資料請求使用Axios.
路由管理使用React-router-dom,並將路由列表導入useRoutes產生路由組件.
表單處理使用formik及自定義hooks.

# 資料夾結構
components放置無副作用且以接受props為主的組件.
containers放置較為複雜的複合組件.
pages放置路由的入口組件.
redux內的sagas為各類資料的請求邏輯,store為整合不同狀態管理模組和相關配置.
