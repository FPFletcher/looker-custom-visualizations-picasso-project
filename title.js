looker.plugins.visualizations.add({id:"Title_subtitle",label:"Title Subtitle",options:{title_label:{section:"Title",order:1,type:"string",label:"Title Label",placeholder:"Custom Title Label",default:"Custom Title Label"},title_font_size:{section:"Title",label:"Font size (px)",order:2,type:"string",values:[{72:"72px"},{54:"54px"},{48:"48px"},{36:"36px"},{24:"24px"},{18:"18px"},{14:"14px"},{12:"12px"}],display:"select",default:"18px"},title_font_family:{section:"Title",label:"Font Family",order:3,type:"string",value:[{"Google Sans":"Google Sans"},{"Noto Sans":"Noto Sans"},{"Noto Sans JP":"Noto Sans JP"},{"Noto Sans CJK KR":"Noto Sans CJK KR"},{"Noto Sans Arabic UI":"Noto Sans Arabic UI"},{"Noto Sans Devanagari UI":"Noto Sans Devanagari UI"},{"Noto Sans Hebrew":"Noto Sans Hebrew"},{"Noto Sans Thai UI":"Noto Sans Thai UI"},{Helvetica:"Helvetica"},{Arial:"Arial"}],display:"select",default:"Google Sans"},title_font_serif:{section:"Title",label:"Serif",order:4,type:"boolean",display:"toggle",default:"yes"},title_position:{section:"Title",label:"Title Position",order:4,type:"string",values:[{Center:"center"},{Left:"left"},{Right:"right"}],display:"select",default:"center"},title_color:{section:"Title",label:"Title Color",order:5,default:"#FFFFFF",type:"string",display:"color"},vis_background_color:{section:"Title",label:"Background Color",order:6,default:"#002060",type:"string",display:"color"}},create:function(i,l){i.innerHTML=`
      <head><link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></head>
      <style>
        #vis {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0px;
          font-family: "Montserrat", "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif;
        }
        .card_vis {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .title_bloc {
          width: 100%;
          font-size: 18px;
        }
      </style>
    `;const t=document.getElementById("vis");t.className="vis_container";var e=i.appendChild(document.createElement("div"));e.className="card_vis",title_container=e.appendChild(document.createElement("div")),title_container.className="title_bloc",title_container._textElement=title_container.appendChild(document.createElement("div")),title_container._textElement.id="title_text"},updateAsync:function(i,l,t,e,n,o){if(this.clearErrors(),e.fields.dimensions.length!=1){this.addError({title:"Add one random Dimension",message:"Add just one random dimension - not used in the viz - just to be able to run the visualization."});return}else if(e.fields.measures.length!=0){this.addError({title:"Remove Measures",message:"Add just one random dimension - not used in the viz - just to be able to run the visualization."});return}switch(title_container._textElement.innerHTML=t.title_label?t.title_label:"",title_container.style.fontSize=t.title_font_size,title_container.style.color=t.title_color,title_container.style.textAlign=t.title_position,t.title_position){case"left":title_container._textElement.style.marginLeft="20px";case"right":title_container._textElement.style.marginRight="20px";default:title_container._textElement.style.marginRight="0px 0px 0px 0px"}vis.style.background=t.vis_background_color,o()}});
