## wave-sight

![image](https://github.com/FelixMitsui/wave-sight/blob/main/public/assets/images/bind_221031.png?raw=true)

## 專案應用

組件以React Hooks 編寫,React-Bootstrap做為樣式.
資料管理使用Redux-saga,主要處理資料庫數據.
資料請求使用Axios.
路由管理使用React-router-dom,並將路由列表導入useRoutes產生路由組件.
表單處理使用formik及自定義hooks.
客服連線使用socket.io,提供用戶與客服之間的訊息傳送。

## 前端路由

將路由配置帶入(src/router/routes)roteList陣列，如果該路由組件有子路由，則後綴加入Entry，並以(src/router/RouteGroup)useRoutes生成路由群組組件，再帶入專案入口檔案(src/index)。

 優點:
1.路由邏輯集中管理。

## 數據管理

Redux store只存放資料庫相關數據，product state的儲存格式採取嵌套Map物件，外層的key為cid(category id)內層的key為page，以cid作為key的好處是，每個不同分類的product頁面，都有獨立的儲存空間。

 優點:
1.Map解決了共用存儲空間互相覆蓋數據的問題。

## 資料欄位設計

 cid(category id):以9碼表示，為每個product數據的欄位，代表該產品的分類，在請求資料庫時，replace掉尾數為0的值，接著以正規式匹配開頭編碼相同的數據。

 user_auth:此為權限欄位，以二進制運算判斷權限，0(一般用戶)、1(能查看後台)、2(可編輯後台數據)。

## 主要資料夾結構

 pages:頁面組件。
 
 components:部分組件分為common(共通)、user(用戶相關)、product(產品相關)。
 
 router:路由邏輯。
 
 redux:狀態管理。
 
 hooks:自訂義hook。
 
 HOC:高階組件。
 
 services:請求後端邏輯。
 
 utils:constants(常量變數)、tools(工具函式)。

## 優化部分

路由組件，使用16.6版的Lazy函式，讓該頁面組件能按需加載。
圖片加載使用LazyLoadImage第三方組件，在圖片位於窗口時才載入，同於img標籤的loading屬性。
