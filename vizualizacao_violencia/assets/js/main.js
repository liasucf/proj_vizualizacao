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
  top:50,
  right: 115,
  bottom: 50,
  left: 80
},
width = 750 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;


diameter =  330

// Adds the svg canvas
var chart1 = d3.select("#bubble")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");


// Adds the svg canvas
var	chart2 = d3.select("#line")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var	legend = d3.select("#legend")
.append("svg")
  .attr("width", 250)
  .attr("height", 150)


// create a list of keys
var keys = ["Homens Não Negros (HNN)", "Homens Negros (HNN)", "Mulheres Não Negras (MNN)", "Mulheres Negras (MN)"]

// Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
.domain(keys)
.range(['#663796', '#a554a7', '#c3455b', '#93003a'])

// Add one dot in the legend for each name.
var size = 20
legend.selectAll("mydots")
.data(keys)
.enter()
.append("rect")
  .attr("x", 10)
  .attr("y", function(d,i){ return 30 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
  .attr("width", size)
  .attr("height", size)
  .style("fill", function(d){ return color(d)})

    // Add one dot in the legend for each name.
var size = 20
legend.selectAll("mylabels")
.data(keys)
.enter()
.append("text")
  .attr("x", 10 + size*1.5)
  .attr("y", function(d,i){ return 30 + i*(size+5) + (size/2) + 1}) // 100 is where the first dot appears. 25 is the distance between dots
  .style("fill", "black")
  .text(function(d){ return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")


  toggleText = function(classe) {
    console.log(classe)
    if (classe === "HNN") {
      d3.select(".text_hero")
      .transition()
      .duration(1500)
      .text('Ao longo dos anos, a quantidade de homicídios no Brasil de Homens Não Negros diminuiu.');}
    if (classe === "HN") {
      d3.select(".text_hero")
      .transition()
      .duration(1500)
      .text('Ao contrário de estastísticas de homícidos na população que diminuiram ao longo do tempo, a violência contra Homens Negros aumentou consideravelmente ao logo dos 7 anos');}
    if (classe === "MNN") {
      d3.select(".text_hero")
      .transition()
      .duration(1500)
      .text('A violência contra a mulher não negra se manteve praticamente estável no Brasil, mostrando o quanto essa classe racial ainda sofre uma grande influencia pelos preconceitos de genêro que não diminuiu ao longo dos anos');}
    if (classe === "MN") {
      d3.select(".text_hero")
      .transition()
      .duration(1500)
      .text('No caso de Mulheres Negras a quantidade de Homicídios quase dobrou ao longo dos anos de 2000-2017 ');}
    }


d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/dados_vizualizacao_proj_final.csv", function(data) {
var parseDate = d3.timeParse("%Y")
  bisectDate = d3.bisector(function(d) {return new Date(d.date); }).left;
var dateFormatter = d3.timeFormat("%Y");

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

  sumMap.set(d.key, d.values)

  return sumMap
})

// Add Y axis
var y = d3.scaleLinear()
  .range([height, 0]);

// Define the line

var line = d3.line()
  .x(function(d) {
    return (x(new Date(d.key)));
  })

  .y(function(d) {
    return (y(d.value.sum));
  });


updatesScales = function(classe) {
  var allSums = []
  sumMap.get(classe).forEach(function(d) {
    allSums.push(d.value.sum)

    return allSums
  })
  y.domain([0, d3.max(allSums, d => d)])
}



var allClasses = d3.map(nest, function(d) {
  return (d.key)
}).keys()
var myColor = d3.scaleOrdinal()
  .domain(allClasses)
  .range(['#663796', '#a554a7', '#c3455b', '#93003a']
  );
var nestB = d3.nest()
  .key(function(d) {
    return d.classe;
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

var dataJson = []
nestB.forEach(function(d) {
  for (var i in d.value)
    var soma = d.value[i]
  a = {
    "Classe": d.key,
    "Sum": soma
  }
  dataJson.push(a)
  return dataJson
})

var dataDict = {
  children: dataJson
}



var tip = d3.tip()
.attr('class', 'd3-tip-outer')
.html((d, i) => {
  const item = d.data
  const color = myColor(i)
  var a = ''
  if (item.Classe == "HNN"){
    return `<div class="d3-tip" style="background-color: ${color}"> Homem Não Negro <br>
  Total de Homicídios:  ${new Intl.NumberFormat('de-DE').format(item.Sum)}</div><div class="d3-stem" style="border-color: ${color} transparent transparent transparent"></div>`  }
  if (item.Classe == "HN"){
    return `<div class="d3-tip" style="background-color: ${color}"> Homem Negro <br>
    Total de Homicídios:  ${new Intl.NumberFormat('de-DE').format(item.Sum)}</div><div class="d3-stem" style="border-color: ${color} transparent transparent transparent"></div>`  }
  if (item.Classe == "MNN"){
    return `<div class="d3-tip" style="background-color: ${color}"> Mulher Não Negra <br>
    Total de Homicídios:  ${new Intl.NumberFormat('de-DE').format(item.Sum)}</div><div class="d3-stem" style="border-color: ${color} transparent transparent transparent"></div>`  }
  if (item.Classe == "MN"){
    return `<div class="d3-tip" style="background-color: ${color}"> Mulher Negra <br>
  Total de Homicídios:  ${new Intl.NumberFormat('de-DE').format(item.Sum)}</div><div class="d3-stem" style="border-color: ${color} transparent transparent transparent"></div>`  }

  
})

var bubble = d3.pack(dataDict)
  .size([diameter, diameter])
  .padding(1.5);


var nodes = d3.hierarchy(dataDict)
  .sum(function(d) {
    return d.Sum;
  });





// Function to create the initial graph
var initialGraph = function(classe) {

  updatesScales(classe)
  toggleText(classe)
  const path = chart2.selectAll(".line")
    .data(function(d) {
      return [sumMap.get(classe)];
    })
    .enter()
    .append("path")
    .attr("d", function(d) {
      return line(d)
    })
    .attr("fill", "none")
    .attr("stroke", function(d) {
      return myColor(classe)
    })
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

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

  chart2.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
      .ticks(7)
      .tickSizeInner(0)
      .tickPadding(6)
      .tickSize(0, 0));

  chart2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(7));

  
  chart2.append('text')
  .attr('class', 'title')
  .attr('x', width / 2 )
  .attr('y', margin.top/2 - 50)
  .attr('text-anchor', 'middle')
      .text('Gráfico de Linha do Tempo dos anos 2000-20017 de '+ classe);

  // Add a label to the y axis
  chart2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 80)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Quantidade de Homicídios")
    .attr("class", "y axis label");
  
  var dataLine = []
  sumMap.get(classe).forEach(function(d) {
     a = {
      "date": d.key,
      "sum": d.value.sum
    }
    dataLine.push(a)
    return dataLine
  })
  
var focus = chart2.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 5);

      focus.append("rect")
          .attr("class", "tooltip")
          .attr("width", 140)
          .attr("height", 50)
          .attr("x", 10)
          .attr("y", -22)
          .attr("rx", 4)
          .attr("ry", 4);

      focus.append("text")
          .attr("class", "tooltip-date")
          .attr("x", 18)
          .attr("y", -2);

      focus.append("text")
          .attr("x", 18)
          .attr("y", 18)
          .text("Homicídios: ");

      focus.append("text")
          .attr("class", "tooltip-sums")
          .attr("x", 95)
          .attr("y", 18);

      chart2.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

  function mousemove() {

    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(dataLine, x0, 1),
        d0 = dataLine[i - 1],
        d1 = dataLine[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    focus.attr("transform", "translate(" + x(new Date(d.date)) + "," + y(d.sum) + ")");
    focus.select("text").text(function() { return d.sum; });
    focus.select(".tooltip-date").text(dateFormatter(new Date(d.date)));
    focus.select(".tooltip-sums").text(d.sum);
    focus.select(".x-hover-line").attr("y2", height - y(d.sum));
    focus.select(".y-hover-line").attr("x2", width + width);
  }
}

 // Update the data
var updateGraph = function(selectedClasse) {

  updatesScales(selectedClasse)
  toggleText(selectedClasse)
  // Update the Y-axis
  d3.select(".y")
    .transition()
    .duration(1500)
    .call(d3.axisLeft(y)
      .ticks(7)
      .tickSizeInner(0)
      .tickPadding(6)
      .tickSize(0, 0));


  d3.select(".title")
       .text('Gráfico de Linha do Tempo dos anos 2000-20017 de '+ selectedClasse)

  chart2.selectAll("path.line")
    .data(function(d) {
      return [sumMap.get(selectedClasse)]
    })
    .transition()
    .duration(1000)
    .attr("d", function(d) {
      return line(d)
    })
    .attr("stroke", function(d) {
      return myColor(selectedClasse)
    })

    var dataLine = []
  sumMap.get(selectedClasse).forEach(function(d) {
     a = {
      "date": d.key,
      "sum": d.value.sum
    }
    dataLine.push(a)
    return dataLine
  })
  
  
var focus = chart2.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 5);

      focus.append("rect")
          .attr("class", "tooltip")
          .attr("width", 140)
          .attr("height", 50)
          .attr("x", 10)
          .attr("y", -22)
          .attr("rx", 4)
          .attr("ry", 4);

      focus.append("text")
          .attr("class", "tooltip-date")
          .attr("x", 18)
          .attr("y", -2);

      focus.append("text")
          .attr("x", 18)
          .attr("y", 18)
          .text("Homicídios: ");

      focus.append("text")
          .attr("class", "tooltip-sums")
          .attr("x", 95)
          .attr("y", 18);

      chart2.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(dataLine, x0, 1),
        d0 = dataLine[i - 1],
        d1 = dataLine[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    focus.attr("transform", "translate(" + x(new Date(d.date)) + "," + y(d.sum) + ")");
    focus.select("text").text(function() { return d.sum; });
    focus.select(".tooltip-date").text(dateFormatter(new Date(d.date)));
    focus.select(".tooltip-sums").text(d.sum);
    focus.select(".x-hover-line").attr("y2", height - y(d.sum));
    focus.select(".y-hover-line").attr("x2", width + width);
  }

}

// Create initial graph
initialGraph("HNN")

var node = chart1.selectAll(".node")
  .data(bubble(nodes).descendants())
  .enter()
  .filter(function(d) {
    return !d.children
  })
  .append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

node.append("title")
  .text(function(d) {
    return d.Classe;
  })


node.append("circle")
  .attr("r", function(d) {
    return d.r;
  })
  .style("fill", function(d, i) {
    return myColor(i);
  })
.on('mouseover', tip.show)
.on('mouseout' , tip.hide)
.on("click", function (d) {
      updateGraph(d.data.Classe)
})

  
node.call(tip);
 
node.append("text")
.attr("dy", "0.2em")
.style("text-anchor", "middle")
.style('font-weight', '80')
.style('font-size', 17)
.text(function(d) {
    return d.data.Classe.substring(0, d.r / 3);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", function(d) {
    return d.r / 5;
  })
.style("fill", "black")
.style('pointer-events', 'none');






})

