$(function(){
	var book_data = [];
	$.getJSON("babyGoldenSentence.json", function (data){
				for(var i = 0; i < data.length; i++){
					var object=new Object();
					object["img"]="images/page_L"+(i+1)%7+".png";
					object["num"]=i+1;
					object["text"]=new Array(data[i].yuyan);
					object["title"]=data[i].date;
					object["type"]=1;
					book_data.push(object);
		
				}
				creat_html(book_data)
			});
   
    function creat_html(data,num){

        $('.flipbook').html('');
        var b_ok = true,
            b_num = 0;
        var html ='';

        for(var i=0; i<data.length; i++){
            if(b_ok){
                var type = data[i].type,
                    p_text = data[i].text,
                    page_html = '',
                    title = data[i].title,
                    isImg = data[i].isimg;

                var isshow = 'block';

                if(i == data.length -1){
                    isshow = 'none';

                }
                if(type == 1){
                    var pic_html = '<div class="book_pic"><p>世上无难事，只怕有心人</p></div>',
                        pH = '',
                        pImg = '';

                    if(isImg){
                        pImg = '<img style="margin-bottom:25px;" src="'+isImg+'"/>'
                    }

                    for(var j=0; j<p_text.length; j++){
                        var p_arr = [],
                            arr_html = '';
                        if(p_text[j].indexOf('@') > 0){
                            p_arr = p_text[j].split('@');
                            for(var k=0; k<p_arr.length; k++){
                                arr_html+=p_arr[k] + "</br>"
                            }
                            pH += '<p class="text_pl">'+arr_html+'</p>'
                        }else{
                            pH += '<p class="text_pl">'+p_text[j]+'</p>'
                        }
                    }

                    page_html += '<div class="page_d">' +
                        '<div class="book_text">' +
                        pic_html+
                        pImg+
                        pH+
                        '</div>' +
                        '<p class="next_page" style="display:'+isshow+'">下一页</p>' +
                        '</div>'
                }

                if(type == 2){
                    var page_html = '';

                    page_html += '<div class="page_L1 cover"><img src="'+data[i].img+'" alt="">' +
                        '<p class="w_title">'+title+'</p>' +
                        '<p class="pre_page">上一页</p> ' +
                        '</div>'
                }

                if(type == 3){
                    var pic_html = '<div class="book_pic"><p>世上无难事，只怕有心人</p></div>',
                        pH = '',
                        pImg = '';

                    if(isImg){
                        pImg = '<a target="_blank"><img src="'+isImg+'"/></a>'
                    }

                    for(var j=0; j<p_text.length; j++){
                        var p_arr = [],
                            arr_html = '';
                        if(p_text[j].indexOf('@') > 0){
                            p_arr = p_text[j].split('@');
                            for(var k=0; k<p_arr.length; k++){
                                arr_html+=p_arr[k] + "</br>"
                            }
                            pH += '<p class="text_pl">'+arr_html+'</p>'
                        }else{
                            pH += '<p class="text_pl">'+p_text[j]+'</p>'
                        }
                    }


                    page_html += '<div class="page_d">' +
                        '<div class="book_text">' +
                        pH+
                        pImg+
                        '</div>' +
                        '<p class="next_page" style="display:'+isshow+'">下一页</p>' +
                        '</div>'
                }
                html+=page_html;
            }
        }
        if(b_ok){
            $('.flipbook').append(html);
            var turnWidth = $('#cover').outerWidth(),
                turnHeight = $('#cover').outerHeight();

            $('.flipbook').turn({
                width: turnWidth*2+20,
                height: turnHeight,
                elevation: 50,
                gradients: true,
                autoCenter: true,
                display:'double',
                when: { turning: function(event, page, pageObject) {

                    } }
            });

            $('.bookmark').on('click','li',function(){
                var self = $(this),
                    id = self.attr('data-id');
                $('.flipbook').turn('page', id);
            })

            $('.back_catalog').click(function(){
                $('.flipbook').turn('page', 1);
            })
        }

    }
})