(()=>{"use strict";const e={formSelector:".popup__content",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:".popup__input-error"},t={cardTitle:".element__title",cardImageLink:".element__img",likeButton:".element__like",likeCount:".element__like-count",deleteButton:".element__delete"},s=document.querySelector(".popup_type_description"),r=document.querySelector(".profile__edit-button"),i=s.querySelector(".popup__input_field_name"),n=document.querySelector(".profile__name"),o=s.querySelector(".popup__input_field_subtitle"),l=document.querySelector(".profile__subtitle"),a=(s.querySelector(".popup__close"),s.querySelector(".popup__content"),document.querySelector(".popup_type_new-avatar")),_=document.querySelector(".profile__avatar-btn"),c=document.querySelector(".profile__avatar-img"),h=(a.querySelector(".popup__input_field_link-avatar"),a.querySelector(".popup__close"),a.querySelector(".popup__content"),document.querySelector(".popup_type_add-card")),u=document.querySelector(".add-button"),p=(h.querySelector(".popup__close"),h.querySelector(".popup__input_field_place"),h.querySelector(".popup__input_field_link"),h.querySelector(".popup__content"),document.querySelector(".popup_type_delete-photo")),d=(p.querySelector(".popup__close"),document.querySelector(".popup_type_image")),m=(d.querySelector(".popup__image"),d.querySelector(".popup__image-caption"),d.querySelector(".popup__close_type_image"),document.querySelector(".elements__container"));class k{constructor({cardData:e,config:t,userId:s,template:r,handleCardClick:i,handleCardDelete:n,handleLikeClick:o}){this._name=e.name,this._link=e.link,this._description=e.description,this._likes=e.likes,this._cardId=e._id,this._userId=s,this._cardOwner=e.owner._id,this._cardSelector=r,this._cardTitleSelector=t.cardTitle,this._cardImgLinkSelector=t.cardImageLink,this._likeBtnSelector=t.likeButton,this._deleteBtnSelector=t.deleteButton,this._likeCount=t.likeCount,this._handleCardClick=i,this._handleCardDelete=n,this._handleLikeClick=o}_getTemplate(){return document.querySelector(this._cardSelector).content.children[0].cloneNode(!0)}_setEventListeners(){this._likeBtn.addEventListener("click",(()=>this._handleLikeClick())),this._userId===this._cardOwner?this._deleteBtn.addEventListener("click",(e=>this._handleCardDelete(e))):this._deleteBtn.remove(),this._image.addEventListener("click",(()=>{this._handleCardClick()}))}generateCard(){return this._element=this._getTemplate(),this._likeBtn=this._element.querySelector(this._likeBtnSelector),this._deleteBtn=this._element.querySelector(this._deleteBtnSelector),this._likeCountElement=this._element.querySelector(this._likeCount),this._image=this._element.querySelector(this._cardImgLinkSelector),this._element.querySelector(this._cardTitleSelector).textContent=this._name,this._likeCountElement.textContent=this._likes.length,this._image.src=this._link,this._image.alt=this._description,this._likeDirection(),this._setEventListeners(),this._element}addLikeCard(){this._likeBtn.classList.add("element__like_is-liked"),this.isLiked=!0}removeLikeCard(){this._likeBtn.classList.remove("element__like_is-liked"),this.isLiked=!1}_checkUserLike(){return this._likes.some((e=>e._id===this._userId))}_likeDirection(){this._checkUserLike()?this.addLikeCard():this.removeLikeCard()}updLikesCounter(e){this._likeCountElement.textContent=e.length}}class S{constructor(e,t){this._formElement=t,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formInputs=[...this._formElement.querySelectorAll(this._inputSelector)],this._errors=[...this._formElement.querySelectorAll(this._errorClass)],this._formButton=this._formElement.querySelector(this._submitButtonSelector)}_setEveentListeners(){this._formInputs.forEach((e=>{e.addEventListener("input",(()=>{this._checkFormValid(e),this._toggleStyleSubmitBtn()}))}))}clearErrors(){this._formInputs.forEach((e=>{this._errors.forEach((t=>{this._hideInputErrors(e,t)}))})),this._disableSubmitBtn()}_showInputErrors(e,t){t.textContent=e.validationMessage,e.classList.add(this._inputErrorClass)}_hideInputErrors(e,t){t.textContent="",e.classList.remove(this._inputErrorClass)}_checkFormValid(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.validity.valid?this._hideInputErrors(e,t):this._showInputErrors(e,t)}_enableSubmitBtn(){this._formButton.classList.remove(this._inactiveButtonClass),this._formButton.disabled=!1}_disableSubmitBtn(){this._formButton.classList.add(this._inactiveButtonClass),this._formButton.disabled="disabled"}_toggleStyleSubmitBtn(){this._formInputs.every((e=>e.validity.valid))?this._enableSubmitBtn():this._disableSubmitBtn()}enableValidation(){this._setEveentListeners()}}class v{constructor(e){this._popup=e,this._popupCloseBtn=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popupCloseBtn.addEventListener("click",(()=>{this.close()})),this._popup.addEventListener("mousedown",(e=>{e.target===e.currentTarget&&this.close()}))}}class C extends v{constructor(e,t){super(e),this._form=e.querySelector(".popup__content"),this._submitForm=t,this._inputFields=e.querySelectorAll(".popup__input"),this._submitBtn=e.querySelector(".popup__save")}_getInputValues(){return this._inputValues={},this._inputFields.forEach((e=>{this._inputValues[e.name]=e.value})),this._inputValues}setSubmitBtnText(e){this._submitBtn.textContent=e}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",(e=>{e.preventDefault(),this._submitForm(this._getInputValues())}))}close(){super.close(),this._form.reset()}}const E=new class{constructor({serverUrl:e,headers:t}){this._serverUrl=e,this._headers=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`${e.status} ${e.statusText}`)}getCards(){return fetch(`${this._serverUrl}/cards`,{method:"GET",headers:this._headers}).then(this._checkResponse).catch((e=>console.log(e)))}getUserInfo(){return fetch(`${this._serverUrl}/users/me`,{method:"GET",headers:this._headers}).then(this._checkResponse).catch((e=>console.log(e)))}getAllData(){return Promise.all([this.getCards(),this.getUserInfo()])}createCard(e){return fetch(`${this._serverUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResponse).catch((e=>console.log(e)))}setUserInfo(e){return fetch(`${this._serverUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._checkResponse).catch((e=>console.log(e)))}setUserAvatar(e){return fetch(`${this._serverUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._checkResponse).catch((e=>console.log(e)))}addLike(e){return fetch(`${this._serverUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then(this._checkResponse).catch((e=>console.log(e)))}removeLike(e){return fetch(`${this._serverUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then(this._checkResponse).catch((e=>console.log(e)))}deleteCard(e){return fetch(`${this._serverUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then(this._checkResponse).catch((e=>console.log(e)))}}({serverUrl:"https://mesto.nomoreparties.co/v1/cohort-59",headers:{authorization:"015f9389-f767-4004-b14e-b18f050be44c","Content-Type":"application/json"}}),f=new class{constructor(e,t){this._renderer=e,this._container=t}renderItems(e){e.forEach((e=>{const t=this._renderer(e);this.addItem(t,"append")}))}addItem(e,t){"append"===t?this._container.append(e):this._container.prepend(e)}}(x,m),y=new class{constructor(e,t,s){this._profileNameElement=e,this._profileSubtitleElement=t,this._avatarElement=s}setUserInfo({name:e,about:t,userId:s}){this._profileNameElement.textContent=e,this._profileSubtitleElement.textContent=t,this._profileId=s}getUserInfo(){return{name:this._profileNameElement.textContent,about:this._profileSubtitleElement.textContent}}getUserId(){return this._profileId}setUserAvatar({avatar:e}){this._avatarElement.src=e}}(n,l,c),b=new class extends v{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._popupTitle=this._popup.querySelector(".popup__image-caption")}open(e,t,s){this._popupImage.src=t,this._popupImage.alt=s,this._popupTitle.textContent=e,super.open()}}(d),L=new C(h,(e=>{L.setSubmitBtnText("Сохранение..."),E.createCard(e).then((e=>{f.addItem(x(e),"prepend")})).finally((()=>{L.setSubmitBtnText("Создать"),L.close()}))})),g=new C(s,(e=>{g.setSubmitBtnText("Сохранение..."),E.setUserInfo(e).then((()=>{y.setUserInfo(e)})).finally((()=>{g.close(),g.setSubmitBtnText("Сохранить")}))})),B=new C(a,(e=>{B.setSubmitBtnText("Сохранение..."),E.setUserAvatar(e).then((()=>{y.setUserAvatar(e)})).finally((()=>{B.close(),B.setSubmitBtnText("Сохранить")}))})),q=new class extends v{constructor(e){super(e),this._form=e.querySelector(".popup__content"),this._submitBtn=e.querySelector(".popup__save")}updateSubmit(e){this._handleSubmit=e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit()}))}setSubmitBtnText(e){this._submitBtn.textContent=e}}(p),I=new S(e,s),U=new S(e,h),T=new S(e,a);function x(e){"description"in e||(e.description=`На фото - ${e.name}`);const s=new k({cardData:e,config:t,userId:y.getUserId(),template:"#card-template",handleCardClick:()=>{b.open(e.name,e.link,e.description)},handleCardDelete:t=>{q.open(),q.updateSubmit((()=>{q.setSubmitBtnText("Удаление..."),E.deleteCard(e._id).then((()=>{t.target.closest(".element").remove()})).finally((()=>{q.close(),q.setSubmitBtnText("Да")}))}))},handleLikeClick:()=>{s.isLiked?E.removeLike(e._id).then((e=>{s.removeLikeCard(),s.updLikesCounter(e.likes)})):E.addLike(e._id).then((e=>{s.addLikeCard(),s.updLikesCounter(e.likes)}))}});return s.generateCard()}E.getAllData().then((e=>{const[t,s]=e;y.setUserInfo({name:s.name,about:s.about,userId:s._id}),y.setUserAvatar({avatar:s.avatar}),f.renderItems(t)})).catch((e=>console.error(e))),I.enableValidation(),U.enableValidation(),T.enableValidation(),L.setEventListeners(),g.setEventListeners(),b.setEventListeners(),B.setEventListeners(),q.setEventListeners(),r.addEventListener("click",(()=>{const e=y.getUserInfo();i.value=e.name,o.value=e.about,I.clearErrors(),g.open()})),u.addEventListener("click",(()=>{U.clearErrors(),L.open()})),_.addEventListener("click",(()=>{T.clearErrors(),B.open()}))})();