// Formda Girilen Bilgileri Course Class i Icindeki Constructor Ile Aliyoruz
// Course class
class Course {
    constructor(title, instructor, image){

        // Local Storage Icinde Kaydedilecek Data lar Icin
        // Otomatik Id Uretiyoruz
        this.courseId = Math.floor(Math.random()*10000);

        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
// UI class
class UI {

    // Kurs Ekleme Islemini Yapmak Icin 
    // UI Class i Icinde Fonksiyonu Olusturuyoruz
    addCourseToList(course) {

        // Kurs Ekleme Islemini Yaparken Ilk Olarak Kurs Bilgilerinin Yazilacagi Listeyi Seciyoruz
        const list = document.getElementById('course-list');

        // Kurs Ekleme Islemini Yaparken HTML Tag lerini Kullaniyoruz
        // Silme Isleminde Delete Butonunun Oldugu Satirda
        // a tag inin Icinde data-id="${course.courseId}" Kodu Kullanilarak
        // Delete Butonuna Tiklanildiginda Arayuzde Gorunen Data nin 
        // Id Numarasini Otomatik Olarak Almayi Sagliyoruz 
        var html = `
         <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
         </tr>    
    `;

    // Yeni Kurs Bilgisi Ekleme Islemi Yapildiginda
    // En Son Eklenen Kurs Dahil Hepsinin Gorunmesi Icin
    // List Degiskeni Uzerinden innerHTML Ozelligine Gonderiyoruz
     list.innerHTML += html;
    }

    clearControls(){
        const title = document.getElementById('title').value="";
        const instructor = document.getElementById('instructor').value="";
        const image = document.getElementById('image').value="";
    }

    deleteCourse(element){

        // Kurs Listesi Icinde Class Attribute u delete Olan Element Varsa
        if(element.classList.contains('delete')){

            // Class Attribute u delete Olan Elementin Bulundugu Satiri Secip Siliyoruz
            element.parentElement.parentElement.remove();

            // Kullaniciya Verilen Delete Mesajinin 
            // Sadece Butonu Tiklandiginda Gorunmesi Gerekiyor 
            return true;
        }
    }

    // UI Class i Icinde showAlert Fonksiyonunda 
    // Ekranda Gorunecek Uyari Mesajlarinin 
    // Ekranda Yer Alacak Gorunumunu Belirtiyoruz
    showAlert(message, className){
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
}

class Storage {

    // Local Storage Icinde Olan Kurs Bilgilerini Aliyoruz
    static getCourses(){
        let courses;

        // Local Storage Icinde Data Yoksa
        if(localStorage.getItem('courses')===null){

            // Bos Array Olusturuyoruz
            courses=[];
        }else{

            // Local Storage Icinde Data Varsa
            // Data yi JSON Formatina Cevirip Aliyoruz
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    // GetCourses Ile Local Storage Icinden Alinan Datalari Gosteriyoruz
    static displayCourses(){

        // Local Storage Icinde Olan Data yi Aliyoruz
        const courses = Storage.getCourses();

        // Local Storage Icindeki Tum Data lari Tariyoruz
        courses.forEach(course => {
            const ui = new UI();

            // Tarama Sonucunu Ekrana Yazdiriyoruz
            ui.addCourseToList(course);
        });
    }

    // Form Uzerine Girilen Kurs Bilgisini Aliyoruz
    static addCourse(course){

        // Local Storage Icinde Bos Yer Aciyoruz
        const courses = Storage.getCourses();

        // Form Uzerinde Girilen Kurs Bilgisini Listeye Ekliyoruz
        courses.push(course);

        // Form Uzerinde Girilen Kurs Bilgisini Listeye Ekliyoruz
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    static deleteCourse(element){

        // Arayuzdeki Delete Butonuna Tiklandiginda
        // Delete Butonu Elementinin Icinde Id Bilgisi Varsa
        if(element.classList.contains('delete')){

            // Delete Butonu Elementinin Icindeki Id Bilgisini Aliyoruz
            const id = element.getAttribute('data-id');

            // Local Storage Icindeki Kurs Bilgilerini Aliyoruz
            const courses = Storage.getCourses();

            // Kurs Bilgilerini Tariyoruz
            // Bu Tarama Esnasinda index Numaralarini Da Aliyoruz
            courses.forEach((course,index)=>{

                // Tiklanilan Id Numarasi Ile
                // Local Storage Icindeki Data nin Id Numarasi Eslesirse 
                if(course.courseId == id){
                    
                    // Tiklanilan Elementin index Numarasindan Baslayarak 
                    // Belirtilen Sayi Kadar Data yi Siliyoruz
                    courses.splice(index,1);
                }
            });

            // Silme Isleminden Sonra Geride Kalan Bilgileri Listeliyoruz
            localStorage.setItem('courses',JSON.stringify(courses));
        }
    }
}

// Storage Icinde Kurs Bilgisi Varsa DisplayCourse Fonksiyonu Ile
// DOM (HTML) Elementleri Uzerinde Gosteriyoruz
document.addEventListener('DOMContentLoaded',Storage.displayCourses);

// Formu Seciyoruz ve Form Uzerindeki Save Butonuna Tiklandiginda Yapilacak Islemleri Belirtiyoruz
document.getElementById('new-course').addEventListener('submit',function(event){

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

        // Form Uzerinde Girilen Bilgileri
        // Local Storage Ekliyoruz
        Storage.addCourse(course);

        // clear controls
        ui.clearControls();

        // Form Uzerinde Girilmesi Gereken Bilgiler Girildiginde
        // Kullanciya Formun Uzerinde Girilen Bilgilerin Eklendigi Mesajini Veriyoruz
        ui.showAlert('the course has been added','success');
    }

    event.preventDefault();
});

// Kurs Listesinin Tamamini Silme Islemi Icin Tiklanabilir Hale Getiriyoruz 
document.getElementById('course-list').addEventListener('click',function(event){
    const ui = new UI();
    
    // UI Class Icinde true Olarak Dondurulen Degerden Sonra
    // Bu Fonksiyon Yapilan Islemleri if Dongusu Icinde Yapiyoruz

    // Tiklanilan Elemani Silinebilir Hale Geriyoruz
    if(ui.deleteCourse(event.target) == true){
        
        // Form Uzerinde Girilen ve Local Storage a Eklenen Bilgileri
        // Local Storage dan Siliyoruz
        Storage.deleteCourse(event.target);

        // Silme Islemi Yapildiginda Ekranda Kullaniciya Bilgilendirme Mesaji Veriliyor
        ui.showAlert('the course has been deleted','danger');
    }    
});