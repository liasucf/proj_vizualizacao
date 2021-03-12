/**
* Template Name: Restaurantly - v1.2.1
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('.mobile-nav').prepend('<button type="button" class="mobile-nav-close"><i class="icofont-close"></i></button>');
    $('#header').append('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav-close', function(e) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-overly').fadeOut();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Menu list isotope and filter
  $(window).on('load', function() {
    var menuIsotope = $('.menu-container').isotope({
      itemSelector: '.menu-item',
      layoutMode: 'fitRows'
    });

    $('#menu-flters li').on('click', function() {
      $("#menu-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      menuIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });
  });

  // Events carousel (uses the Owl Carousel library)
  $(".events-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    autoplayTimeout: 6000,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Initiate venobox lightbox
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);


// * ----------------- CODE FOR THE TIMELINE GRAPH *--------------// 

var margin = {
  top: 60,
  right: 100,
  bottom: 20,
  left: 80
},
width = 850 - margin.left - margin.right,
height = 370 - margin.top - margin.bottom;



// append the svg object to the body of the page
var svg = d3.select("#line-graph-HNN")
.append("svg")
.style("width", width + margin.left + margin.right + "px")
.style("height", height + margin.top + margin.bottom + "px")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
.attr("class", "svg");




d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/dados_vizualizacao_proj_final.csv", function(data) {
let parseDate = d3.timeParse("%Y")

data.forEach(function(d) {
  d.periodo = parseDate(d.período)
  d.valor = +d.valor
});


var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) {
    return d.periodo;
  }))
  .range([0, width]);


var nest = d3.nest()
  .key(function(d) {
    return d.classe;
  })
  .key(function(d) {
    //console.log(d.periodo)
    return d.periodo
  })
  .rollup(function(leaves) {
    var sum = d3.sum(leaves, function(d) {
      return d.valor
    })
    return {
      sum: sum
    };
  })
  .entries(data)

var sumMap = new Map()
nest.forEach(function(d) {
  //console.log(d.values)

  sumMap.set(d.key, d.values)

  return sumMap
})

// Add Y axis
var y = d3.scaleLinear()
  .range([height, 0]);

// Define the line

var line = d3.line()
  .x(function(d) {
    //console.log((x(new Date(d.key))))
    return (x(new Date(d.key)));
  })

  .y(function(d) {
    //console.log(d.value.sum)
    return (y(d.value.sum));
  });


updatesScales = function(classe) {
  var allSums = []
  sumMap.get(classe).forEach(function(d) {
    //console.log(d.value.sum)
    allSums.push(d.value.sum)

    return allSums
  })
  console.log(d3.max(allSums, d => d))
  y.domain([0, d3.max(allSums, d => d)])
}

//console.log(sumMap.get('HNN'))
// Create 1st dropdown
var classeMenu = d3.select("#classeDropdown")
classeMenu
  .append("select")
  .selectAll("option")
  .data(nest)
  .enter()
  .append("option")
  .attr("value", function(d) {
    return d.key;
  })
  .text(function(d) {
    return d.key;
  })



var allClasses = d3.map(nest, function(d) {
  return (d.key)
}).keys()
console.log(allClasses)
var myColor = d3.scaleOrdinal()
  .domain(allClasses)
  .range(d3.schemeSet2);

console.log(myColor("HNN"))
// Function to create the initial graph
var initialGraph = function(classe) {

  updatesScales(classe)

  const path = svg.selectAll(".line")
    .data(function(d) {
      //console.log(sumMap.get(classe))
      return [sumMap.get(classe)];
    })
    .enter()
    .append("path")
    .attr("d", function(d) {
      //console.log(d)
      return line(d)
    })
    .attr("fill", "none")
    .attr("stroke", function(d) {
      return myColor(classe)
    })
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 4.5)
    .attr("class", "line")
  // Add path


  const pathLength = path.node().getTotalLength();
  const transitionPath = d3
    .transition()
    .ease(d3.easeSin)
    .duration(2800);

  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);

  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
      .ticks(5)
      .tickSizeInner(0)
      .tickPadding(6)
      .tickSize(0, 0));

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(7));


  // Add a label to the y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 60)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Quantidade de Homicídios")
    .attr("class", "y axis label");

}

// Create initial graph
initialGraph("HNN")


// Update the data
var updateGraph = function(selectedClasse) {

  updatesScales(selectedClasse)

  // Update the Y-axis
  d3.select(".y")
    .transition()
    .duration(1500)
    .call(d3.axisLeft(y)
      .ticks(5)
      .tickSizeInner(0)
      .tickPadding(6)
      .tickSize(0, 0));



  svg.selectAll("path.line")
    .data(function(d) {
      return [sumMap.get(selectedClasse)]
    })
    .transition()
    .duration(1000)
    .attr("d", function(d) {
      console.log(d)
      return line(d)
    })
    .attr("stroke", function(d) {
      return myColor(selectedClasse)
    })



}


// Run update function when dropdown selection changes
classeMenu.on('change', function() {

  // Find which fruit was selected from the dropdown
  var selectedClasse = d3.select(this)
    .select("select")
    .property("value")
  //console.log(selectedClasse)
  // Run update function with the selected fruit
  updateGraph(selectedClasse)


});


})
