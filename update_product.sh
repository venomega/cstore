cd productos
(echo -ne "[" ; for i in *yml; do echo -ne "\"$i\", "; done; echo -ne "\b\b]" ) > lista.json
