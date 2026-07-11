def calculate_level(total_xp: int) -> int:
    """
    Calculates the current level based on total XP.
    Level formula: level = (total_xp / 1000) ^ 0.5 + 1
    For MVP, we'll use a simpler threshold system.
    """
    if total_xp < 500: return 1
    if total_xp < 1200: return 2
    if total_xp < 2500: return 3
    if total_xp < 5000: return 4
    if total_xp < 10000: return 5
    return 6

def get_rank_title(level: int) -> str:
    ranks = {
        1: "Code Novice",
        2: "Python Apprentice",
        3: "Bug Hunter",
        4: "Code Warrior",
        5: "Python Master",
        6: "Legendary Developer"
    }
    return ranks.get(level, "Legendary Developer")

def get_xp_for_next_level(current_level: int) -> int:
    thresholds = {
        1: 500,
        2: 1200,
        3: 2500,
        4: 5000,
        5: 10000
    }
    return thresholds.get(current_level, 10000)
