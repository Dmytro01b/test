$("#phoneNumber").inputmask("+(999) 99-999-9999");

let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
var uploaded_image = "";
uploadButton.onchange = () => {
	let reader = new FileReader();
	reader.readAsDataURL(uploadButton.files[0]);
	reader.onload = () => {
		chosenImage.setAttribute("src", reader.result);
		uploaded_image = reader.result;
	};
	fileName.textContent = uploadButton.files[0].name;
};
console.log(uploaded_image);
// const form1 = document.getElementById("form1");
// var values;
// function retriveFormValue(event) {
// 	event.preventDefault();
// 	const gender = form1.querySelector('[name="gender1"]');
// 	values = {
// 		gender: gender.value,
// 	};
// }
// form1.addEventListener("submit", retriveFormValue);
var p = "";
var list = "";
var listAddInfo = "";
var modal = "";
const { form } = document.forms;

var myNode = document.getElementById("results");

function removeElements() {
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
}

function makeCounter() {
	var currentCount = 1;
	return function () {
		return currentCount++;
	};
}
var counter = makeCounter();
let count = 0;
$("#click").on("click", function () {
	count = counter();
});

function retriveFormValue(event) {
	event.preventDefault();

	const formData = new FormData(form);
	let values = Object.fromEntries(formData.entries());
	$(document).ready(function () {
		var url = `https://randomuser.me/api/?gender=${values}`;

		fetchInformation(url);
		function fetchInformation(url) {
			fetch(url)
				.then((response) => response.json())
				.then(function (data) {
					data.results.forEach((person) => {
						p = `
						<div class="user-data__image">
						<img src="${person.picture.large}" alt="" class="rounded-3" style="max-width: 250px" />
						</div>
						<div class="user-data__name">
						<div class="user-data__text">
							<p class="user-data__firstname" id="firstname">${person.name.first}</p>
							<p class="user-data__lastname ">${person.name.last}</p>
						</div>
						<p class="userdata__num">${person.phone}</p>
						<p class="userdata__mail">${person.email}</p>`;
						$("#results").append(p);
					});
					data.results.forEach((person) => {
						list = `
						<tr>
							<th scope="row"><img src="${person.picture.medium}"class="rounded-3"></th>
							<th>${person.name.first}<br>${person.name.last}</th>
							<th>${person.email}</th>
							<th>${person.phone}</th>
							<th>
							<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addInfo${count}">
								Детальна інформація
							</button>
							</th>
						</tr>
						`;
						$("#list").prepend(list);
					});

					modal = `<div
						class="modal fade"
						id="addInfo${count}"
						data-bs-backdrop="static"
						data-bs-keyboard="false"
						tabindex="-1"
						aria-labelledby="staticBackdropLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="staticBackdropLabel">Детальна інформація</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body" id = "resultsList">
									
								</div>
								<div class="modal-footer"></div>
							</div>
						</div>
					</div>`;
					$(document).ready(function () {
						$("#modals").prepend(modal);
					});

					data.results.forEach((person) => {
						listAddInfo = `
						<div class="user-data__image">
							<img src="${person.picture.large}" alt="" class="rounded-3" style="max-width: 250px" />
						</div>
						<div class="user-data__name">
						<div class="user-data__text">
							<p class="user-data__firstname" id="firstname">${person.name.first}</p>
							<p class="user-data__lastname">${person.name.last}</p>
						</div>
						<p class="userdata__num">Phone number = ${person.phone}</p>
						<p class="userdata__mail">Email = ${person.email}</p>
						<p>Gender = ${person.gender}</p>
						<p>Country = ${person.location.country}</p>
						`;

						$("#resultsList").append(listAddInfo);
					});
				});
		}
	});
}

form.addEventListener("submit", retriveFormValue);

const form2 = document.getElementById("form2");
let userP = "";
function retriveFormValue2(event) {
	event.preventDefault();

	const formData = new FormData(form2);
	const values = Object.fromEntries(formData.entries());
	console.log(values);
	userP = `
	<div class="user-data__image img__wrapper">
	<img src="${uploaded_image}" alt="" class="rounded-3 " style="max-width: 250px" />
	</div>
	<div class="user-data__name">
	<div class="user-data__text">
		<p class="user-data__firstname " id="firstname">${values.first}</p>
		<p class="user-data__lastname ">${values.last}</p>
	</div>
	<p class="userdata__num ">${values.phone}</p>
	<p class="userdata__mail ">${values.email}</p>`;
	$("#results").append(userP);

	list = `
	<tr>
		<th scope="row"><img src="${uploaded_image}"class="rounded-3" style="max-width:72px;max-height:72px;" ></th>
		<th>${values.first}<br>${values.last}</th>
		<th>${values.email}</th>
		<th>${values.phone}</th>
		<th>
		<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addInfo${count}">
			Детальна інформація
		</button>
		</th>
	</tr>
	`;
	$("#list").prepend(list);

	modal = `<div
						class="modal fade"
						id="addInfo${count}"
						data-bs-backdrop="static"
						data-bs-keyboard="false"
						tabindex="-1"
						aria-labelledby="staticBackdropLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="staticBackdropLabel">Детальна інформація</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body" id = "resultsList">
									
								</div>
								<div class="modal-footer"></div>
							</div>
						</div>
					</div>`;
	$(document).ready(function () {
		$("#modals").prepend(modal);
	});

	listAddInfo = `
		<div class="user-data__image">
			<img src="${uploaded_image}" alt="" class="rounded-3 remove" style="max-width: 250px" />
		</div>
		<div class="user-data__name">
		<div class="user-data__text">
			<p class="user-data__firstname remove" id="firstname">${values.first}</p>
			<p class="user-data__lastname remove">${values.last}</p>
		</div>
		<p class="userdata__num remove">Phone number = ${values.phone}</p>
		<p class="userdata__mail remove">Email = ${values.email}</p>
		<p>Gender = ${values.gender}</p>
		<p>Adress = ${values.adress}</p>
		`;

	$("#resultsList").append(listAddInfo);

}

form2.addEventListener("submit", retriveFormValue2);

function readURL(input) {
	var reader = new FileReader();
}
