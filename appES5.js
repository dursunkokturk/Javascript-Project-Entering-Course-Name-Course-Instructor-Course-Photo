// Formda Girilen Bilgileri Course Class i Ile Aliyoruz
// Course constructor
function Course(title,instructor ,image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// UI constructor
function UI(){
}

// Kurs Ekleme Islemini Yapmak Icin 
// UI Constructor dan Sonra
// prototype Ozelligini Kullaniyoruz
UI.prototype.addCourseToList = function(course){

    // Kurs Ekleme Islemini Yaparken Ilk Olarak Kurs Bilgilerinin Yazilacagi Listeyi Seciyoruz
    const list = document.getElementById('course-list');

    // Kurs Ekleme Islemini Yaparken HTML Tag lerini Kullaniyoruz
    var html = `
         <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
         </tr>    
    `;

    // Yeni Kurs Bilgisi Ekleme Islemi Yapildiginda
    // En Son Eklenen Kurs Dahil Hepsinin Gorunmesi Icin
    // List Degiskeni Uzerinden innerHTML Ozelligine Gonderiyoruz
    list.innerHTML += html;
}

UI.prototype.clearControls = function(){
    const title = document.getElementById('title').value="";
    const instructor = document.getElementById('instructor').value="";
    const image = document.getElementById('image').value="";
}

UI.prototype.deleteCourse = function(element){

    // Kurs Listesi Icinde Class Attribute u delete Olan Element Varsa
    if(element.classList.contains('delete')){

        // Class Attribute u delete Olan Elementin Bulundugu Satiri Secip Siliyoruz
        element.parentElement.parentElement.remove();
    }
}

// prototype Uzerinden showAlert Fonksiyonunda 
// Ekranda Gorunecek Uyari Mesajlarinin 
// Ekranda Yer Alacak Gorunumunu Belirtiyoruz
UI.prototype.showAlert = function(message,className){
    
    var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>    
    `;

    // Formu En Dis Cerceveden Itibaren Seciyoruz
    const row = document.querySelector('.row');

    // Uyari Mesajinin Gorunecegi Yeri Belirtiyoruz
    // beforeBegin , afterBegin , beforeEnd , afterEnd
    row.insertAdjacentHTML('beforeBegin',alert);

    // Yapilan Islemden Sonra Gorunen Uyari Mesajinin
    // Ekranda Kalancagi Sureyi Belirliyoruz
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);

}

// Formu Seciyoruz ve Form Uzerindeki Save Butonuna Tiklandiginda Yapilacak Islemleri Belirtiyoruz
document.getElementById('new-course').addEventListener('submit',function(e){

    // Course Title Bilgisinin Girilecegi Input Alanini Seciyoruz
    const title = document.getElementById('title').value;

    // Instructor Bilgisinin Girilecegi Input Alanini Seciyoruz
    const instructor = document.getElementById('instructor').value;

    // Image Bilgisinin Girilecegi Input Alanini Seciyoruz
    const image = document.getElementById('image').value;

    // Formda Girilen Bilgileri Alip 
    // Degisken Adi Uzerinden Gerekli Islemleri Yapiyoruz
    // create course object
    const course = new Course(title,instructor,image);

    // Form Alani Disinda Olusturulan UI Constructor i
    // Form Alani Icinde Object Olarak Olusturup 
    // UI Constructor in Atandigi Degisken Adi Uzerinden
    // Form Ile Baglantili Olan Her Yerde Kullanilabilir Hale Getiriyoruz
    // create UI
    const ui = new UI();

    if(title==='' || instructor ==='' || image === ''){

        // Form Uzerinde Girilmesi Gereken Bilgilerden Birisi Girilmediginde
        // Kullanciya Formun Hepsini Doldur Mesaji Veriyoruz
        ui.showAlert('Please complete the form','warning');
    }else{
        // add course to list
        ui.addCourseToList(course); 

        // clear controls
        ui.clearControls();

        // Form Uzerinde Girilmesi Gereken Bilgiler Girildiginde
        // Kullanciya Formun Uzerinde Girilen Bilgilerin Eklendigi Mesajini Veriyoruz
        ui.showAlert('the course has been added','success');
    }

    e.preventDefault();
});

// Kurs Listesinin Tamamini Silme Islemi Icin Tiklanabilir Hale Getiriyoruz 
document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();

    // Tiklanilan Elemani Silinebilir Hale Geriyoruz
    ui.deleteCourse(e.target);

    // Silme Islemi Yapildiginda Ekranda Kullaniciya Bilgilendirme Mesaji Veriliyor
    ui.showAlert('the course has been deleted','danger');
});