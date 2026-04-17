import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./AuthContext"; // ← IMPORT USE AUTH!

export default function HomeScreen() {
  const router = useRouter();
  const { userData, logout } = useAuth(); // ← AMBIL DATA USER DARI CONTEXT!

  // ✅ SEKARANG userData.nama AKAN MENAMPILKAN NAMA YANG DIINPUT SAAT REGISTER!

  const handleLogout = () => {
    logout(); // ← CLEAR DATA USER
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>🎉</Text>
        </View>

        <Text style={styles.welcomeTitle}>Selamat Datang!</Text>

        {/* ✅✅✅ INI YANG DIUBAH - TAMPILKAN NAMA DINAMIS! ✅✅✅ */}
        <Text style={styles.userName}>{userData.nama || "User"} 👋</Text>
        {/* 
          Penjelasan:
          - userData.nama = nama yang diinput saat register
          - || 'User' = fallback kalau kosong (seharusnya tidak terjadi)
        */}

        <Text style={styles.subtitle}>
          Kamu berhasil masuk ke aplikasi dengan aman! 🛡️
        </Text>

        {/* Success Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ Authenticated</Text>
        </View>

        {/* Optional: Show Email */}
        {userData.email ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>📧 Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>
        ) : null}
      </View>

      {/* Features Info */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>🔒 Fitur Keamanan Aktif:</Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Validasi Email dengan RegEx</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>
              Validasi Nomor HP (Numeric Only)
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Password Match Verification</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Keyboard Safe Area Handling</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Dynamic User Name Display 🎯</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Keluar 🔓</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  welcomeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  userName: {
    fontSize: 32, // ← DIPERBESAR BIAR KELIHATAN JELAS!
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#0369a1",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#0c4a6e",
    fontWeight: "500",
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#dcfce7",
    color: "#166534",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "bold",
    fontSize: 14,
  },
  featureText: {
    fontSize: 15,
    color: "#374151",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
