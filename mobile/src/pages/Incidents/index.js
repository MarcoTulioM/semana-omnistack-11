import React, { useEffect, useState } from "react";
import { FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../assets/logo.png";
import { Feather } from "@expo/vector-icons";

export default function Incidents () {

    const [ incidents, setIncidents ] = useState( [] );
    const [ total, setTotal ] = useState( 0 );
    const [ page, setPage ] = useState( 1 );
    const [ loading, setLoading ] = useState( false );

    const navigation = useNavigation();

    function navigateToDetail (incid) {
        navigation.navigate("Detail", { incid });
    }

    async function loadIncidents () {
            if ( loading ) { return; }

            if ( total > 0 && incidents.length == total ) { return; }

            setLoading( true );

            const response = await api.get("incidents", {
                params: { page }
            });

            setIncidents([ ...incidents, ...response.data ]);
            setTotal( response.headers["x-total-count"]);

            setPage( page + 1 );
            setLoading( false );
    }

    useEffect( () => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>
                        {total} casos.
                    </Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-indo!</Text>
            <Text style={styles.description}>
              Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                data={incidents}
                keyExtractor={ incid => String( incid.id ) }
                style={styles.incidentList}
                showsVerticalScrollIndicator={ false }

                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}

                renderItem={({ item: incid} ) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incid.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>
                          {incid.description}
                        </Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl
                          .NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"})
                          .format(incid.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={ () => navigateToDetail( incid ) }
                        >
                            <Text style={styles.detailsButtonText}>
                              ver mais detalhe
                            </Text>
                            <Feather
                              name="arrow-right"
                              size={16}
                              color="#e02041"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
