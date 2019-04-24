# mernshoppinglist


มีสองส่วนคือ server กับ client อยู่รวมกันใน folder เดียว
การรันทั้งสองอันทำพร้อมกัน เสร็จแล้ว จับไปวางไว้บน heroku 
ส่วนฐานข้อมูลอยู่บน mongoatlas
และใช้ redux ในการจัดการ store,state

ในส่วน Server.js
ีรันบน port 5000
ใช้ express รวมกับ middleware เช่น json , auth และ routes
ใช้ routes มี 3 หน้าคือ items,users,auth ตอน dev
ส่วนตอน production ใช้ static บน client/build 
ตอน production เราสร้าง static บน heroku
การใช้ mogodb บน mongodbAtlas

ในโฟลเดอร์ models 
เรามี Item.js และ User.js ที่เป็น pattern 
ซึ่งใช้ เชื่อมกับ ฐานข้อมูล mongodb 

ใน auth.js (middleware)
ใช้สำหรับตรวจสอบ auth หลักการคือ
จะเอา token ที่ส่งมากับ req.header มาถอด 
โดยถอดร่วมกับ jwtScret รหัสลับ จะได้ 
oooo   id ของ user ออกมา
xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 

ใน users.js (routes/api/users) ใช้ routes.post '/'
ใช้สำหรับการ register ครั้งแรก โดย ต้องกรอกข้อมูล
ืname,email,password โดยต้องไม่ว่าง
xxxx ถ้าว่างส่งค่า msg: ให้ส่งค่า enter all fields
ใน mongoDB ตรวจสอบว่าต้อง email ไม่ซ้ำ 
xxxx  ถ้าซ้ำ msg: บอกว่า email ซ้ำ
ถ้าไม่ซ้ำ เอา password มาทำ bcrypt ได้ password ใหม่ 
และเอา id,jwtSecret,expireIn, มาสร้าง token
แล้วส่งข้อมูลกลับให้ client 
oooo  ได้แก่ token, user(id,name,email)

ใน auth.js (route/api/auth) ใช้ routes.post '/'
ใช้สำหรับ การ log in โดยทำการตรวจสอบ
email, password ซึ่งมาจาก req.body 
โดยทั้งสองอัน จะต้องไม่ว่าง
xxxx  ถ้าว่างส่งค่า msg: ให้ส่งค่า enter all fields
ใน mongoDB โดยจะตรวจสอบ ว่ามี email อันนั้นมั้ย
xxxx  ถ้าซ้ำไม่มีอีเมลนี้ msg: บอกว่า email ไม่ปรากฎ
ถ้ามีก็มา bcrypt compare ตรวจสอบว่า password ตรงมั้ย
ถ้าตรงเอา id,jwtSecret,expireIn, มาสร้าง token
แล้วส่งข้อมูลกลับให้ client 
oooo  ได้แก่ token, user(id,name,email)

นอกจากนี้ ใน auth.js ยังมี (route/api/auth/user) 
ใช้สำหรับ ตรวสอบ user และ token ด้วยว่าหมดอายุยัง 
โดยใช้ routes.get '/user' + ยังมี auth (middleware)
< อันนี้ไว้ตรวจสอบ authentication  หลักการคือ
  จะเอา token ที่ส่งมากับ req.header มาถอด 
  โดยถอดร่วมกับ jwtScret รหัสลับ จะได้ 
  id ของ user ออกมา 
  xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 
  >
เราเอา id ที่ได้มาหา user ในฐานข้อมูล โดยเราถอดเอา
password ออกไป และส่งข้อมูล user กลับไปให้ client
oooo  ได้แก่ token, user(id,name,email)

ใน items.js (api/items)
อันนี้ มี 3 อันคือ get,post,delete item 
- อันแรกใช้ router.get '/' หาข้อมูลจาก mongoDB ทั้งหมด
oooo  ได้ array ของ items ส่งไปให้ client

- อันสอง คือ router.post '/' จะมีการตรวจสอบ auth ด้วย
  เป็นการใส่ค่า item ลงไปใหม่ ใน ฐานข้อมูล 
< อันนี้ไว้ตรวจสอบ authentication  หลักการคือ
  จะเอา token ที่ส่งมากับ req.header มาถอด 
  โดยถอดร่วมกับ jwtScret รหัสลับ จะได้ 
  id ของ user ออกมา 
  xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 
  >
หลังจากนั้นก็ บันทึกลงใน mongoDB และส่งกลับ
oooo  ได้แก่ item ส่งกลับไปให้ client 

- อันสาม คือ router.delete '/:id'  จะมีการตรวจสอบ auth ด้วย
  เป็นการลบ item ออกจากฐานข้อมูล
< อันนี้ไว้ตรวจสอบ authentication  หลักการคือ
  จะเอา token ที่ส่งมากับ req.header มาถอด 
  โดยถอดร่วมกับ jwtScret รหัสลับ จะได้ 
  id ของ user ออกมา 
  xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 
  > 
โดยมันจะตรวจสอบ mongoDB ด้วย id และลบ item ออกไปจาก mongoDB
oooo  ส่งค่า success:true ออกไป
xxxx  แต่ถ้า เกิด err จะส่งค่า success:false ออกไป 

===========================================
===========================================
===========================================
ใน client 
มี App.js
เริ่มด้วย ฟังก์ชัน componentDidMount 
หลักๆคือทำหน้า โหลด ข้อมูล user จากฐาน mongoDB มาแสดง
โดยการ dispatch(loadUser) ซึ่งอยู่ใน authActions
- ลำดับ 1  
เริ่มด้วย dispatch USER_LOADING ส่งไปยัง authReducer
ซึ่ง เปลี่ยนค่า isLoading ใน store เป็น true เพื่อแสดงว่า
กำลังโหลดอยู่ ยังไม่เสร็จ 
- หลังจากนั้น จะทำการ ดึงข้อมูล ด้วย axios.get จาก api/auth/user
เพื่อตรวจสอบ authenticaion และดึงว่า user คือใคร 
โดยถ้าสำเร็จจะได้ ข้อมุลกลับมาคือ 
oooo  ได้แก่ token, user(id,name,email) 
และส่ง USER_LOADED กับ res.data ไปยัง  authReducer  
ซึ่งจะเปลี่ยนค่า store คือ isAuthenticated:true, 
isLoading:false และ user.เท่ากับ token, user(id,name,email) 
โดยต้องไม่ลืมว่า token ที่ได้จะเก็บใน localStorage เสมอ
(ตามที่กำหนดใน authReducer)

แต่ถ้าไม่สำเร็จ เกิดจาก  
xxxx   ถ้า token หมดอายุ จะได้รับมาคือ client msg: token not valid
โดยจะทำการเรียกใช้ dispatch(returnErrors) ใน  errorActions
โดยมี type เป็น  GET_ERROR และ payload เป็น msg,staus, id ไม่มี
ซึ่งไปเปลี่ยน ค่า ใน store ใน errorREducer ที่เหมือนกัน msg, id, status อีกที

และทำการ dispatch(type:AUTH_ERROR) ใน authReducer 
ซึ่งจะทำการ กลับไปตั้งค่าต่างใน store ใหม่คือ token:null
isAuthenticated:false, isLoading:false, user:null

หลังจากนั้นใน app.js 
ก็จะเรียกใช้ comonent ต่างๆ ได้แก่ AppNavbar, ItemModal, ShoppingList

เริ่มจาก AppNavbar
โดยมันจะดึงค่า auth ใน store มาใช้ในหน้านี้ใส่ไว้ใน props 
โดยค่าใน auth ก็มี token,isAuthenticated,isLoading และ user
ทำการตรวจสอบค่าโดยถ้า isAuthenticated เป็น true 
็ก็จะ แสดง authLink แต่ถ้าเป็น false แสดง guestLink แทน
ในส่วนของ authLink จะแสดงค่า user.name และ component <logout>
ในส่วนของ guestLink จะแสดงค่า component <login> และ <RegisterModal>

ใน RegisterModal 
ทำหน้าที่ ลงทะเบียน ผู้ใช้ใหม่ 
โดยมี <input> รับค่า name,email,password,และการกดปุ่ม submit 
ซึ่งค่าใน input จะเก็บใน state ของ component นี้ 
เมื่อกดปุ่ม submit จะเรียกใช้ ฟังก์ชัน register ใน  authActions
ซึ่งผูกค่า name,email,password ไปด้วย 
โดย register นี้จะส่งค่าไปยัง '/api/user ด้วย axios.post พร้อมกับ 
body ซึ่งเป็น json ของ name,email,password
โดยถ้าสำเร็จจะได้  ข้อมูลกลับมา
oooo  ได้แก่ token, user(id,name,email)
ให้ส่ง dispatch type เป็น REGISTER_SUCCESS
และ payload เป็น token, user(id,name,email) กลับไปยัง 
authReducer ใน นี้จะกำหนดค่าใน store ใหม่ได้แก่ 
token, user(id,name,email) พร้อมกับกำหนดให้
isAuthenticated เป็น true, และ  isLoading เป็น false
และบันทึก ค่า token ใน localstorage ด้วย
แต่ในกรณีถ้าทำไม่สำเร็จ ซึ่งมี 2 กรณีคือ 
xxxx ถ้าว่างส่งค่า msg: ให้ส่งค่า enter all fields
xxxx  ถ้าซ้ำ msg: บอกว่า email ซ้ำ
ให้เรียกใช้ dispatch (returnErrors) ใน  errorActions
โดยมี type เป็น  GET_ERROR และ payload เป็น msg,staus, 
พิเศษ id= REGISTER_FAIL 
ซึ่งไปเปลี่ยน ค่า ใน store ใน errorREducer ที่เหมือนกัน msg, id, status อีกที
ตามด้วยการ dispatch(type:REGISTER_FAIL) ใน authReducer 
ซึ่งจะทำการ กลับไปตั้งค่าต่างใน store ใหม่คือ token:null
isAuthenticated:false, isLoading:false, user:null
นอกจากนี้ในหน้า component นี้ยังมีฟังกัชัน
componentDidUpdate คอยตรวจสอบสถานของ error.id และถ้าพบว่า
มีการเปลี่ยนแปลง และเท่ากับ REGISTER_FAIL กำหนดค่าใน local 
state.msg ให้เท่ากับ  msg ที่ server ส่งมา ถ้าไม่ก็เป็น null ไปด้วย
ส่วนในกรรที่ isAuthenticated เป็น true ก็ให้ปิดหน้า RegisterModal
นี้ไป 

ส่วนการ <login> ก็คล้ายๆกับการ <registermodal>
คือแสดงเป็น modal ขึ้นมา
ทำหน้าที่ให้กรอกการ login 
โดยมี <input> รับค่า email,password,และการกดปุ่ม submit 
ซึ่งค่าใน input จะเก็บใน state ของ component นี้ 
เมื่อกดปุ่ม submit จะเรียกใช้ ฟังก์ชัน login ใน  authActions
ซึ่งผูกค่า email,password ไปด้วย 
โดย login นี้จะส่งค่าไปยัง '/api/auth ด้วย axios.post พร้อมกับ 
body ซึ่งเป็น json ของ email,password
โดยถ้าสำเร็จจะได้  ข้อมูลกลับมา
oooo  ได้แก่ token, user(id,name,email)
ให้ส่ง dispatch type เป็น LOGIN_SUCCESS
และ payload เป็น token, user(id,name,email) กลับไปยัง 
authReducer ใน นี้จะกำหนดค่าใน store ใหม่ได้แก่ 
token, user(id,name,email) พร้อมกับกำหนดให้
isAuthenticated เป็น true, และ  isLoading เป็น false
และบันทึก ค่า token ใน localstorage ด้วย
แต่ในกรณีถ้าทำไม่สำเร็จ ซึ่งมี 2 กรณีคือ 
xxxx ถ้าว่างส่งค่า msg: ให้ส่งค่า enter all fields
xxxx  ถ้าซ้ำ msg: บอกว่า email ไม่มี
ให้เรียกใช้ dispatch (returnErrors) ใน  errorActions
โดยมี type เป็น  GET_ERROR และ payload เป็น msg,staus, 
พิเศษ id= REGISTER_FAIL 
ซึ่งไปเปลี่ยน ค่า ใน store ใน errorREducer ที่เหมือนกัน msg, id, status อีกที
ตามด้วยการ dispatch(type:LOGIN_FAIL) ใน authReducer 
ซึ่งจะทำการ กลับไปตั้งค่าต่างใน store ใหม่คือ token:null
isAuthenticated:false, isLoading:false, user:null
นอกจากนี้ในหน้า component นี้ยังมีฟังกัชัน
componentDidUpdate คอยตรวจสอบสถานของ error.id และถ้าพบว่า
มีการเปลี่ยนแปลง และเท่ากับ LOGIN_FAIL กำหนดค่าใน local 
state.msg ให้เท่ากับ  msg ที่ server ส่งมา ถ้าไม่ก็เป็น null ไปด้วย
ส่วนในกรรที่ isAuthenticated เป็น true ก็ให้ปิดหน้า RegisterModal
นี้ไป 

การ   <logout> 
เมื่อทำการ click ที่  logout เรียก ฟังก์ชัน logout
ใน authAction มาใช้งาน 
โดยมันจะ ส่งค่า return  type:LOGOUT_SUCCESS
ไปยัง authReducer ซึ่งจะทำการ กลับไปตั้งค่าต่างใน 
store ใหม่คือ token:null
isAuthenticated:false, isLoading:false, user:null

ใน  <shoppingList>
เป็นการแสดงรายการต่างๆ ที่ต้องทำขึ้นมา 
โดยเมื่อเริ่มจะเรียกใช้ componentDidMount ซึ่งจะเรียกใช้
getItems ใน itemAction   
โดยในฟังก์ชันนี้จะทำการ dispatch(setItemLoading) ก่อน
คือ กำหนด type:ITEMS_LOADING ซึ่งเปลี่ยนค่าใน 
itemReducer คือทำให้  loading:true
หลังจากนั้นก็ ใช้ axios.get('/api/items')
oooo  ได้ array ของ items ส่งไปให้ client
จะได้ ค่า อะเรของ items กลับมา (อันนี้ไม่มีเขียน error ไว้ใน server
นะลืม) แต่ก็เขียนที่  client ไว้รองรับ 
ให้เรียกใช้ dispatch (returnErrors) ใน  errorActions

โดยกลับมาที่ภายใน component 
เราเอาค่า items มาจาก store เอาค่าทำการ map
แล้วแสดง ใน <ListGroup> ซึ่งมี content คือ {name} และมี
<button> ที่เมื่อ click จะทำการใช้ฟังก์ชัน onDeleteClick โดยผูกกับ id
ซึ่งในฟังก์ชันนี้เรียกใช้ deleteItem ที่อยู่ใน itemAction 
เพราะมันต้อง ทำการ axios.delete('/api/items โดยเราต้อใส่ id ที่ต้องลบ 
+tokenconfig ด้วยเพราะต้องการทำ authentication  
ถ้า ไม่ authentication จะส่ง msg กลับไป
xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 
ถ้า ผ่าน token ก็ทำการลบได้ 
ถ้า server ทำการลบโดยอาจสำเร็จหรือไม่สำเร็จ จะส่งค่ากลับดังนี้ 
oooo  ส่งค่า success:true ออกไป
xxxx  แต่ถ้า เกิด err จะส่งค่า success:false ออกไป 
โดยถ้าสำเร็จ จะทำการ dispatch  type:DELETE_ITEM
และ payload : id ของอันที่ลบออกไป โดยใน itemReducer
เราจะใช้ filter out เอา item ที่ id นั้นออกไป แค่นั้น

<ItemModal>
เป็นหน้าที่ต้องกรอก name ของ item ลงไปใน <input> 
และใส่ <button> ที่เมื่อ click จะเรียกใช้ onSubmit 
เพื่อเรียกใช้ addItem ที่ต้องผูกค่า item.name ลงไปด้วย 
โดยฟังก์ชันนี้อยู่ใน itemAction 
ทำการ axios.post('/api/items/+ item และ +tokenconfig
ด้วยเพราะต้องการทำ authentication  
ถ้า ไม่ authentication จะส่ง msg กลับไป
xxxx   ถ้า token หมดอายุ จะส่ง client msg: token not valid 
ถ้า ผ่าน token ก็ทำการเพิ่มได้ 
โดยผลที่ลับมีเพิ่มสำเร็จกับไม่สำเร็จ 
ถ้าสำเร็จ 
oooo  ได้แก่ item ส่งกลับไปให้ client 
ก็จะทำการ dispatch type:ADD_ITEM กับ payload: คือ item
ีที่เพิ่มเข้าไป ซึ่งไปดำเนินการต่อที่ itemReducer 
จะทำการเพิ่ม item นั้นเข้าไปใน items ที่เป็น array
(อันนี้ไม่มีเขียน error ไว้ใน server
นะลืม) แต่ก็เขียนที่  client ไว้รองรับ 
ให้เรียกใช้ dispatch (returnErrors) ใน  errorActions
