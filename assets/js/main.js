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

var margin_bars = { top: 20, right: 50, bottom: 30, left: 50 },
width_bars = 600 - margin_bars.left - margin_bars.right,
height_bars = 350 - margin_bars.top - margin_bars.bottom;

diameter =  330

// Adds the svg canvas
var chart1 = d3.select("#bubble")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble")
  .append("g")
  .attr("transform", "translate(" + 0 + "," + 20 + ")");
  

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


var chart3 = d3.select("#bar_2000")
.append("svg")
  .attr("width", width_bars + margin_bars.left + margin_bars.right)
  .attr("height", height_bars + margin_bars.top + margin_bars.bottom)
.append("g")
  .attr("transform", "translate(" + margin_bars.left + "," + margin_bars.top + ")");

var chart4 = d3.select("#bar_2017")
  .append("svg")
    .attr("width", width_bars + margin_bars.left + margin_bars.right)
    .attr("height", height_bars + margin_bars.top + margin_bars.bottom)
  .append("g")
    .attr("transform", "translate(" + margin_bars.left + "," + margin_bars.top + ")");

  //--------------- CODIGO BARRAS AGRUPADAS -------------------------------

  
  var x0 =  d3.scaleBand()
          .rangeRound([0, width_bars])
          .padding(0.1);
  
  var x1 =  d3.scaleBand();  
  
  var y =  d3.scaleLinear().range([height_bars, 0]);
  
  var x0_2017 =  d3.scaleBand()
          .rangeRound([0, width_bars])
          .padding(0.1);
  
  var x1_2017 =  d3.scaleBand();  
  
  var y_2017 =  d3.scaleLinear().range([height_bars, 0]);

  var color =  d3.scaleOrdinal()
    .range(['#93003a', '#663796', '#a554a7','#c3455b']);
    
  var xAxis = d3.axisBottom(x0)
  var yAxis = d3.axisLeft(y).tickFormat(d3.format(".1f"));

  var xAxis_2017 = d3.axisBottom(x0_2017)
  var yAxis_2017 = d3.axisLeft(y_2017).tickFormat(d3.format(".1f"));
  
    //--------------- CODIGO BARRAS AGRUPADAS -------------------------------

// create a list of keys
var keys = [ "Mulheres Não Negras (MNN)", "Mulheres Negras (MN)",  "Homens Não Negros (HNN)",  "Homens Negros (HN)" ]

// Usually you have a color scale in your chart already
var color_legend = d3.scaleOrdinal()
.domain(keys)
.range(['#c3455b', '#a554a7', '#663796',   '#93003a'])

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
  .style("fill", function(d){ return color_legend(d)})

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
  d3.select('.bubble-circle').attr("opacity", '1.0');
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
    .attr("stroke-width", 3.5)

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
          .attr("class", "tooltip-line")
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
  d3.select('.bubble-circle').attr("opacity", '0.5');

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
          .attr("class", "tooltip-line")
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

chart1.append('text')
.attr('x', 300/2 +15 )
.attr('y',  0)
.attr('text-anchor', 'middle')
.text('Gráfico de Bolhas para cada Gênero e Classe');



node.append("title")
  .text(function(d) {
    return d.Classe;
  })

var toRemove;
node.append("circle")
  .attr("r", function(d) {
    return d.r;
  })
  .style("fill", function(d, i) {
    return myColor(i);
  })
  .attr('class','bubble-circle')
  .attr('opacity', '0.5')
.on('mouseover', tip.show)
.on('mouseout' , tip.hide)
.on("click", function (d) {
    updateGraph(d.data.Classe)

      if(toRemove){
        d3.select(toRemove).attr("opacity", '0.5');
    }
    toRemove = this;
    d3.select(this).attr("opacity", '1.0');
})

//Na hora que a pagina carregar se a classe for HNN - > opacity=1.0
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

// Create initial graph
initialGraph("HNN")




})


// -------------------------- GRAFICO DE BARRAS AGRUPADAS ------------------------------------- 


d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/dados_vizualizacao_proj_final.csv", function (error, data) {
  if (error) throw error;

  var facts_2000 = crossfilter(data);
  var facts_2017 = crossfilter(data);

  (function() {
    var year = facts_2000.dimension(d => d.período)
    year.filter(2000)
    var year_2017 = facts_2017.dimension(d => d.período)
    year_2017.filter(2017)
  })()

  
  var nameClass_2000 = facts_2000.dimension(d => [d.nome, d.classe]);
  var nameClass_2017 = facts_2017.dimension(d => [d.nome, d.classe]);

  var nameClassGroup = nameClass_2000.group().reduceSum(function (d) {
    return d["taxa"];
    
  });

  var regioesAcessor = function (d) {
    return d.key[0];
    
  };

  var classAcessor = function (d) {
   
    return d.key[1];
  };

  var taxaAcessor = function (d) {
    return d.value;
  };

  var filteredData = nameClassGroup.all();

  var className = d3.set(filteredData.map(classAcessor)).values();
  var regioes = d3.set(filteredData.map(regioesAcessor)).values();
  var naxTaxa = d3.max(filteredData.map(taxaAcessor));
  // console.log(naxTaxa);

  x0.domain(regioes);
  
    
  x1.domain(className).rangeRound([0, x0.bandwidth()]);
  y.domain([0, naxTaxa]);

  var nestedData = d3
    .nest()
    .key(regioesAcessor)
    .key(classAcessor)
    .rollup(function (d) {
      return { 
        
        value: taxaAcessor(d[0]) };
    })
    .entries(filteredData);

  chart3
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart3
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Taxa");

  var state = chart3
    .selectAll(".state")
    .data(nestedData)
    .enter()
    .append("g")
    .attr("class", "g")
    .attr("transform", function (d) {
      return "translate(" + x0(d.key) + ",0)";
    });

  state
    .selectAll("rect")
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append("rect")
    .attr("class", "rect-line")
    .attr("width", x1.bandwidth())
    .attr("x", function (d) {
      return x1(d.key);
    })
    .attr("y", function (d) {
      return y(d.value.value);
    })
    .attr("height", function (d) {
      return height - y(d.value.value);
    })
    .style("fill", function (d) {
      return color(d.key);
    })
    .call(title)
    .on("mouseover", onMouseover)
    .on("mouseout", onMouseout); 
  
    function title(g){
       g.append("title").text(d => `${d.value.value} Taxa por 100 mil habitantes`)}


    function onMouseover(elemData) {

    d3.selectAll(".rect-line")
    .filter( function(d) { 
        return d.key !== elemData.key})
              .transition()
                .duration(500)
                  .attr("opacity", 0.5)
            

}
    function onMouseout(elemData) {

      d3.selectAll(".rect-line")
      .filter( function(d) { 
        return d.key !== elemData.key})
              .transition()
                .duration(500)
                  .attr("opacity", 1)
            

    }


  var legend = chart4
    .selectAll(".legend")
    .data(className.slice().reverse())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
      return d;
    });

// ----------------------------- GRÁFICO DE BARRAS AGRUPADADS 2017 
      
      var nameClassGroup_2017 = nameClass_2017.group().reduceSum(function (d) {
      //  console.log("taxa", d.taxa)
        
        return d["taxa"];
        
      });

      var regioesAcessor_2017 = function (d) {
        return d.key[0];
        
      };

      var classAcessor_2017 = function (d) {
       
        return d.key[1];
      };

      var taxaAcessor_2017 = function (d) {
        return d.value;
      };

      var filteredData_2017 = nameClassGroup_2017.all();
      console.log("filteredData", filteredData_2017);

      var className_2017 = d3.set(filteredData_2017.map(classAcessor_2017)).values();
      var regioes_2017 = d3.set(filteredData_2017.map(regioesAcessor_2017)).values();
      var naxTaxa_2017 = d3.max(filteredData_2017.map(taxaAcessor_2017));
      // console.log(naxTaxa);



      x0_2017.domain(regioes_2017);
      x1_2017.domain(className_2017).rangeRound([0, x0_2017.bandwidth()]);
      y_2017.domain([0, naxTaxa_2017]);

      var nestedData_2017 = d3
        .nest()
        .key(regioesAcessor_2017)
        .key(classAcessor_2017)
        .rollup(function (d) {
          return { value: taxaAcessor_2017(d[0]) };
        })
        .entries(filteredData_2017);

      chart4
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_2017);

      chart4
        .append("g")
        .attr("class", "y axis")
        .call(yAxis_2017)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Taxa");

      var state_2017 = chart4
        .selectAll(".state")
        .data(nestedData_2017)
        .enter()
        .append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
          return "translate(" + x0_2017(d.key) + ",0)";
        });

        state_2017
        .selectAll("rect")
        .data(function (d) {
          return d.values;
        })
        .enter()
        .append("rect")
        .attr("class", "rect-line")
        .attr("width", x1_2017.bandwidth())
        .attr("x", function (d) {
          // console.log("Aqui", d.values.value);
          return x1_2017(d.key);
        })
        .attr("y", function (d) {
          return y_2017(d.value.value);
        })
        .attr("height", function (d) {
          return height - y_2017(d.value.value);
        })
        .style("fill", function (d) {
          return color(d.key);
        })
        .call(title)
        .on("mouseover", onMouseover)
        .on("mouseout", onMouseout); 
});



// ---------------------------- CODIGO GRÁFICO DE BARRAS EMPILHADOS ------------------------//

var margin_empilhado = {
  top:50,
  right: 80,
  bottom: 50,
  left: 80
},
width_empilhado = 660 - margin_empilhado.left - margin_empilhado.right,
height_empilhado = 475 - margin_empilhado.top - margin_empilhado.bottom

var	chart5 = d3.select("#stacked")
.append("svg")
  .attr("width", width_empilhado + margin_empilhado.left + margin_empilhado.right)
  .attr("height", height_empilhado + margin_empilhado.top + margin_empilhado.bottom)
.append("g")
  .attr("transform", "translate(" + margin_empilhado.left + "," + margin_empilhado.top + ")");

  function highlight(elemData) {

    d3.selectAll(".rect-group")
    .filter( function(d) { 
        return d.key !== elemData.key})
              .transition()
                .duration(500)
                  .attr("opacity", 0.5)
            

}

  function restore(elemData) {

      d3.selectAll(".rect-group")
      .filter( function(d) { 
        return d.key !== elemData.key})
              .transition()
                .duration(500)
                  .attr("opacity", 1)
            

    }
      function title(g){
       g.append("title").text(newData => `${d3.format(",.0f")(newData[1] - newData[0]).replace(/,/g, '.')} Mortes`)}
    
d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/dados_vizualizacao_proj_final.csv", function (error, data) {
  if (error) throw error;

  var facts_bars = crossfilter(data);
  
  
 var nomeDimension = facts_bars.dimension(d => [d.nome, d.classe])
  
 var nomeByValorGroup = nomeDimension.group().reduceSum(function(d) {
 return d.valor; })
  
var seg_data = nomeByValorGroup.all()

 var newData = seg_data.reduce((retArr, data) => {
  const subGrp = retArr.find(e => e.category === data.key[0])
  if (subGrp && !subGrp.hasOwnProperty(data.key[1])){
    subGrp[data.key[1]] = data.value
  }
  else {
    const newSubGrp = {category: data.key[0]}
    newSubGrp[data.key[1]] = data.value
    retArr.push(newSubGrp)
  }
  
  if (!retArr.hasOwnProperty("columns")){
    retArr.columns = [data.key[1]]
  }
  else if (!retArr.columns.includes(data.key[1])) {
    retArr.columns.push(data.key[1])
  }
  return retArr
}, [])

var series = d3.stack().keys(newData.columns)(newData).map(s => (s.map(e => (e.key = s.key, e)), s))


  var subgroups = series.map(e => e.key)                
  var color = d3.scaleOrdinal(['#93003a','#663796', '#a554a7',  '#c3455b']).domain(subgroups);

   var xScale = d3.scaleBand()
    .domain(data.map(function(d){return d.nome;}))
    .range([0, width_empilhado])
    .padding(0.1);
  
  var yScale = d3.scaleLinear()
    .domain([0,d3.max(series, d => d3.max(d, d=> d[1]))])
    .range([height_empilhado,0]);
    
   
 var rects = chart5
  .selectAll("g")
  .data(series)
  .enter()
    .append("g")
    .attr("class", "rect-group")
    .each(d => console.log(d.key,color(d.key)))
    .attr("fill", d => color(d.key))
    .attr("opacity", 1)
    .on("mouseover", highlight)
    .on("mouseout", restore); 
    
 
 rects.selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter().append('rect')
    .attr("x", (d, i) => xScale(d.data.category))
    .attr("y", d=> yScale(d[1]))
    .attr("height", d=> yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .call(title)
    
  
   const xAxis = chart5.append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate(0,"+height_empilhado+")")
    .call(d3.axisBottom(xScale));
    
      
  const yAxis = chart5.append("g")
    .attr("id", "yAxis")
    .call(d3.axisLeft(yScale));
    
  function legend( g ){ 
  const entry = g
    .append("g")
    .selectAll(".entry")
    .data(subgroups)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(0,${(20) * i})`
    )
    .attr("class", "entry");

  entry
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", d => color(d));

  entry
    .append("text")
    .text(d => d)
    .attr("x", 20)
    .attr("y", 15 / 2)
    .attr("dy", "0.35em")
    .style("font", "15px sans-serif")
    .attr("color", "black")
}
      chart5
    .append("g").attr("class", "gclass")
    .attr("transform", `translate(${width_empilhado + margin.left - 175},0)`)
    .call(legend);
 

  })



 // ----------------------- CODIGO DO MAPA 

 d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/taxa-homicidios-2000-2017.csv", function(data) {


data.forEach(function(d) {
  d.ano = +d['período']
  d.valor = +d['valor']
  d.nome = d['nome']
});




var vectorColorScale = ['#710022', '#c34060', '#f891ad', '#7d3f99', '#974795', '#c3455b']

var allYear = d3.map(data, function(d) {
  return (d.ano)
}).keys()

var classeMenu = d3.select("#classeDropdown")
classeMenu
  .append("select")
  .selectAll("option")
  .data(allYear)
  .enter()
  .append("option")
  .attr("value", function(d) {
    return d;
  })
  .text(function(d) {
    return d;
  })

var colorScale = d3.scaleQuantile()
  .domain([15, 20, 25, 35, 45, 50])
  .range(['#710022', '#c34060', '#f891ad', '#7d3f99', '#974795', '#c3455b'])



var mapInstance = L.map('mapid').setView([-13.1612437, -62.4787481], 4)

L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
Map tiles by &copy; <a href="https://carto.com/attribution">CARTO</a>`,
  maxZoom: 10
}).addTo(mapInstance)



function zoomToFeature(e) {
  mapInstance.fitBounds(e.target.getBounds())
}

var initialMap = function(initialYear) {




  var regiaoMap = new Map()
  var ano = initialYear
  data.forEach(function(d) {      
    if (d.período == ano) {
      return regiaoMap.set(d.nome, +d.valor)
    }

  })
  function style(feature) {
    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6,
      fillColor: colorScale(regiaoMap.get(feature.properties.SIGLA))
    };
  }


d3.select(".info.container").remove()
// control that shows state info on hover
let infoControl = L.control()

infoControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info container');
  this.update();
  return this._div;
}



infoControl.update = function (feat) {
    this._div.innerHTML = '<h5>Taxa de homicídios por 100 mil habitantes </h5>'   + (feat ?
      '<b>' + feat.properties.SIGLA + " - " + feat.properties.NOME1 + '</b><br />' + regiaoMap.get(feat.properties.SIGLA) + '% de homicídios'
      : 'Passe o mouse sobre uma região');
}

infoControl.addTo(mapInstance);


  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: '#AAA',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    infoControl.update(layer.feature);
  }

var legendControl = L.control({
    position: 'bottomright'
  });

  legendControl.onAdd = function(map) {

    let div = L.DomUtil.create('div', 'info legend'),
      labels = [],
      n = vectorColorScale.length,
      from, to;

    for (let i = 0; i < n; i++) {
      let c = vectorColorScale[i]
      let fromto = colorScale.invertExtent(c);
      labels.push(
        '<i style="background:' + vectorColorScale[i] + '"></i> ' +
        d3.format("d")(fromto[0]) + (d3.format("d")(fromto[1]) ? '&ndash;' + d3.format("d")(fromto[1]) : '+'));
    }

    div.innerHTML = labels.join('<br>')
    return div
  }
  legendControl.addTo(mapInstance)

var geoj
  function resetHighlight(e) {
    geoj.resetStyle(e.target);
    infoControl.update();
  }


  
function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
  
$.ajax({
  type: "GET",
  url: "https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/output.geojson",
  dataType: 'json',
  success: function (response) {
   geoj = L.geoJson(response, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(mapInstance)
  }
});
 

  
}

initialMap('2000')

var updateMap = function(selectedYear) {


  var regiaoMap = new Map()
  var ano = selectedYear
  data.forEach(function(d) {
    if (d.período == ano) {
      return regiaoMap.set(d.nome, +d.valor)
    }

  })
  
  function style(feature) {
    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6,
      fillColor: colorScale(regiaoMap.get(feature.properties.SIGLA))
    };
  }


d3.select(".info.container").remove()
// control that shows state info on hover
let infoControl = L.control()

infoControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info container');
  this.update();
  return this._div;
}



infoControl.update = function (feat) {
    this._div.innerHTML = '<h5>Taxa de homicídios por 100 mil habitantes </h5>'   + (feat ?
      '<b>' + feat.properties.SIGLA + " - " + feat.properties.NOME1 + '</b><br />' + regiaoMap.get(feat.properties.SIGLA) + '% de homicídios'
      : 'Passe o mouse sobre uma região');
}

infoControl.addTo(mapInstance);


  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: '#AAA',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    infoControl.update(layer.feature);
  }
 d3.select(".info.legend").remove()

var legendControl = L.control({
    position: 'bottomright'
  });

  legendControl.onAdd = function(map) {

    let div = L.DomUtil.create('div', 'info legend'),
      labels = [],
      n = vectorColorScale.length,
      from, to;

    for (let i = 0; i < n; i++) {
      let c = vectorColorScale[i]
      let fromto = colorScale.invertExtent(c);
      labels.push(
        '<i style="background:' + vectorColorScale[i] + '"></i> ' +
        d3.format("d")(fromto[0]) + (d3.format("d")(fromto[1]) ? '&ndash;' + d3.format("d")(fromto[1]) : '+'));
    }

    div.innerHTML = labels.join('<br>')
    return div
  }
  legendControl.addTo(mapInstance)

var geoj
  function resetHighlight(e) {
    geoj.resetStyle(e.target);
    infoControl.update();
  }


  
function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
  
$.ajax({
  type: "GET",
  url: "https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/output.geojson",
  dataType: 'json',
  success: function (response) {
   geoj = L.geoJson(response, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(mapInstance)
  }
});
 
}
// Run update function when dropdown selection changes
classeMenu.on('change', function() {

  // Find which fruit was selected from the dropdown
  var selectedYear = d3.select(this)
    .select("select")
    .property("value")
  //console.log(selectedClasse)
  // Run update function with the selected fruit
  updateMap(selectedYear)


});


})