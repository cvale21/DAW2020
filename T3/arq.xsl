<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
   
    <xsl:template match="/">
        
        <xsl:result-document href="site/index.html">
        
            <html>
                <head>
                    <title>Arqueossítios do Noroeste Português</title>
                </head>

                <body>
                    <h2>Arqueossítio do NW Português</h2>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!--  ###Templates de Índice###  -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!--  ###Templates de Conteúdo###  -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1 style="text-align:center; background-image: linear-gradient(to right, #43cea2, #185a9d);
                        color: white;">Arqueossítios do Nordeste Português</h1>
                    
                    <div class="w3-container">
                        
                    
                        <h3><b>Identificação:</b><xsl:value-of select="IDENTI"/></h3>
                        <xsl:choose><xsl:when test="LUGAR"><h3><b>Lugar: </b><xsl:value-of select="LUGAR"/></h3></xsl:when></xsl:choose>
                        
                        <h4><b>Descrição: </b><xsl:value-of select="DESCRI"/></h4>
                        <h4><b>Cronologia: </b><xsl:value-of select="CRONO"/></h4>                
                        <xsl:if test="IMAGEM"><p><b>Imagem:</b><xsl:value-of select="IMAGEM/@NOME"/></p></xsl:if>
                    
                        <a><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></a>
                        <a style="font-size:14px"><b>Latitude: </b><xsl:value-of select="LATITU"/></a>
                        <a style="font-size:14px"><b> | Longitude: </b><xsl:value-of select="LONGIT"/></a>
                        <a style="font-size:14px"><b> Altitude: </b><xsl:value-of select="ALTITU"/></a>
                        
                        <p><b>Concelho: </b><xsl:value-of select="CONCEL"/></p>
                        <p><b>Acesso: </b><xsl:value-of select="ACESSO"/></p>
                        
                        <p><b>Interesse: </b><xsl:value-of select="INTERE"/></p>
                        <p><b>Interpretação: </b><xsl:value-of select="INTERP"/></p>
                        <p><b>Descrição Arq. :</b><xsl:value-of select="DESARQ"/></p>
                        
                        <xsl:if test="QUADRO"><p><b>Enquadramento: </b><xsl:value-of select="QUADRO"/></p></xsl:if>
                        <xsl:if test="TRAARQ"><p><b>Histórico de Trabalhos Arqueológicos: </b><xsl:value-of select="TRAARQ"/></p></xsl:if>
               
                        <xsl:if test="BIBLIO"><p><b>Bibliografia: </b><xsl:value-of select="BIBLIO"/></p></xsl:if>
                        <p><b>Código Administrativo:</b><xsl:value-of select="CODADM"/></p>
                         
                        <xsl:if test="AUTOR"><p style="text-align:center"><b>Autor: </b><xsl:value-of select="AUTOR"/></p></xsl:if>
                        <xsl:if test="DATA"><p style="text-align:center"><b>Data: </b><xsl:value-of select="DATA"/></p></xsl:if> 
                        
                    </div>
                    
                    <div class="addr" style="text-align:center; padding-bottom: 20px;">
                        <address>[<a href="index.html#i{generate-id()}">Home</a>]</address>
                    </div>
                    
                    <div class="footer" style="width: 100%; padding-top: 20px; padding-bottom: 10px;
                        background-image: linear-gradient(to right, #43cea2, #185a9d);
                        text-align: center; font-weight: 600;
                        font-size: large; color: antiquewhite;">
                        <p>TPC 3 -- DAW -- PG42816</p>
                    </div>
                    
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>