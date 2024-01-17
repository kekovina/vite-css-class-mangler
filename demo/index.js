import styleselect from 'styleselect';
import 'styleselect/scss/styleselect.scss';
import Select from 'vanilla-select'

$(function () {
    $('.about-image').on('click', function(){
        $('.about-image').removeClass('about-image__active')
        $(this).addClass('about-image__active')
        const $this = $(this)
        $('#about-image-view').animate({
            opacity: 0
        }, {
            duration: 500,
            done: function(){
                $('#about-image-view').attr('src', $this.find('img').attr('src')).animate({ opacity: 1 }, 500)
            }
        })
    })

    $('.dropdown').on('click', function(){
        $(this).toggleClass('dropdown__active')
        if($(this).hasClass('dropdown__active')){
            $(this).siblings('.dropdown-content').slideDown(500)
        } else {
            $(this).siblings('.dropdown-content').slideUp(500)
        }
        
    })

    $('#burger-btn').on('click', function(){
        $(this).toggleClass('active')
        $('.burger-menu').slideToggle()
    })
    $('.burger-menu a').on('click', function(){
        $('#burger-btn').removeClass('active')
        $('.burger-menu').slideUp()
    })


    $('.categories__item').on('click', function(){
        $('.categories__item').removeClass('categories__item--active')
        const $this = $(this)
        const categoryContentSelector = $this.data('category-content')
        $('.category-tab--show').fadeOut({
            duration: 100,
            done: function(){
                $(this).removeClass('category-tab--show')
                $(`#${categoryContentSelector}`).fadeIn({
                    duration: 100,
                    done: function(){
                        $this.addClass('categories__item--active')
                        $(this).addClass('category-tab--show')
                    }
                })
            }
        })
    })

    $('a').on('click', function(e){
        if($(this).attr('href').includes('#')){
            e.preventDefault()
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr('href')).offset().top - 50
            }, 1000);
        }
    })

    $('.category-case-link').on('click', function(){
        const category = $(this).data('category')
        const caseId = $(this).data('case')
        const tab = $(`.categories__item[data-category=${category}]`)
        const tabContentSelector = '#' + tab.data('category-content')
        tab.trigger('click')
        $(`.category-tab${tabContentSelector} .category__case.category__case--show`).removeClass('category__case--show')
        $(`.category-tab${tabContentSelector} .category__case[data-case=${caseId}]`).addClass('category__case--show')
        $([document.documentElement, document.body]).animate({
            scrollTop: $("section#portfolio").offset().top
        }, 1000);
    })

    $('input[name=tank]').on('change', function(){
        $('.capacity-input').slideToggle(100)
    })

    $('.faq__item').on('click', function(){
        $(this).children('.answer').slideToggle()
    })

    styleselect('select[name=object_type]')
    styleselect('select[name=object_source]')
    styleselect('select[name=diameter]')
    styleselect('select[name=cat_2_type_1]')
    styleselect('select[name=cat_2_type_2]')
})